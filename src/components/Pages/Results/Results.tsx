import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./results.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectCurrentQuestion,
  selectQuizData,
} from "../../../redux/quiz/selectors";
import {
  decrement,
  increment,
  resetCurrentQuestion,
  resetQuiz,
} from "../../../redux/quiz/slice";
import AnswerSelector from "../../AnswerSelector";
import { Button } from "../../UI";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { QUESTIONS_NUMBER } from "../../../constants";

const Results: FC = () => {
  const [btnPreviousActive, setBtnPreviousActive] = useState<boolean>(false);
  const [btnNextActive, setBtnNextActive] = useState<boolean>(true);

  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const { currentIndex, answers } = useAppSelector(selectQuizData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetCurrentQuestion());
  }, []);

  useEffect(() => {
    if (currentIndex === 0) {
      setBtnPreviousActive(false);
    } else {
      setBtnPreviousActive(true);
    }
    if (currentIndex === QUESTIONS_NUMBER - 1) {
      setBtnNextActive(false);
    } else setBtnNextActive(true);
  }, [currentIndex]);

  useEffect(() => {
    if (!currentQuestion) {
      navigate("/");
    }
  }, [currentQuestion]);

  const handleBtnNextClick = () => {
    dispatch(increment());
  };

  const handleBtnPreviousClick = () => {
    dispatch(decrement());
  };

  return (
    currentQuestion && (
      <div className={styles.resultsBody}>
        <AnswerSelector
          id={currentQuestion.id}
          answer={answers[currentQuestion.id]}
          correctAnswer={currentQuestion.correctAnswer}
        >
          <AnswerSelector.Question img={currentQuestion.img}>
            {currentQuestion.question}
          </AnswerSelector.Question>
          <AnswerSelector.AnswersContainer>
            {currentQuestion.answers.map((answer, index) => (
              <AnswerSelector.Answer key={answer} index={index}>
                {answer}
              </AnswerSelector.Answer>
            ))}
          </AnswerSelector.AnswersContainer>
        </AnswerSelector>
        <div className="container  mt-5 mb-4">
          <div className={styles.btnContainer}>
            <Button
              onClick={handleBtnPreviousClick}
              type="outlined"
              buttonSize="large"
              startIcon={<AiFillCaretLeft />}
              disabled={!btnPreviousActive}
            >
              Previous
            </Button>
            <div>
              <Link
                to="/"
                onClick={() => {
                  dispatch(resetQuiz());
                }}
                className={`${styles.backToMenuBtn} me-5`}
              >
                <Button buttonSize="large">Back to menu</Button>
              </Link>
              <Button
                onClick={handleBtnNextClick}
                type="primary"
                buttonSize="large"
                endIcon={<AiFillCaretRight />}
                disabled={!btnNextActive}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Results;
