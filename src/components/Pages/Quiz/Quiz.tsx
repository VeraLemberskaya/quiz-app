import React, { useEffect, useState } from "react";

import styles from "./quiz.module.scss";
import { Button, Loader } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { increment, initQuiz } from "../../../redux/quiz/slice";
import {
  selectCurrentQuestion,
  selectQuizData,
} from "../../../redux/quiz/selectors";
import { AiFillCaretRight } from "react-icons/ai";
import AnswerSelector from "./AnswerSelector";
import { QUESTIONS_NUMBER } from "../../../constants";

const Quiz: React.FC = () => {
  const [btnNextActive, setBtnNextActive] = useState<boolean>(false);
  const { status, currentIndex } = useAppSelector(selectQuizData);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const dispatch = useAppDispatch();

  const handleAnswerSelect = (answer: number) => {
    if (currentIndex !== QUESTIONS_NUMBER - 1) {
      if (answer === currentQuestion.correctAnswer) {
        setTimeout(() => {
          setBtnNextActive(true);
        }, 1200);
      } else {
        setTimeout(() => {
          setBtnNextActive(true);
        }, 2500);
      }
    }
  };

  useEffect(() => {
    setBtnNextActive(false);
  }, [currentIndex]);

  useEffect(() => {
    dispatch(initQuiz());
  }, []);

  const handleNextClick = () => {
    dispatch(increment());
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className={styles.quizBody}>
          <AnswerSelector
            id={currentQuestion.id}
            onSelect={handleAnswerSelect}
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
          <div className="container mt-5 mb-4">
            <Button
              className={styles.btnNext}
              type="primary"
              buttonSize="large"
              endIcon={<AiFillCaretRight />}
              onClick={handleNextClick}
              disabled={!btnNextActive}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
