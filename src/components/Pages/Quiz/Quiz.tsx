import React, { useEffect, useState } from "react";

import styles from "./quiz.module.scss";
import { Button, Loader } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { decrement, increment, initQuiz } from "../../../redux/quiz/slice";
import {
  selectCurrentQuestion,
  selectQuizData,
  selectQuizStatus,
} from "../../../redux/quiz/selectors";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import AnswerSelector from "./AnswerSelector";
import { QUESTIONS_NUMBER } from "../../../constants";

const Quiz: React.FC = () => {
  const [buttonNextVisible, setButtonNextVisible] = useState<boolean>(false);
  const { status, currentIndex } = useAppSelector(selectQuizData);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const dispatch = useAppDispatch();

  const handleAnswerSelect = (answer: number) => {
    if (currentIndex < QUESTIONS_NUMBER) {
      setButtonNextVisible(true);
    }
  };

  useEffect(() => {
    setButtonNextVisible(false);
  }, [currentIndex]);

  useEffect(() => {
    dispatch(initQuiz());
  }, []);

  const handleNextClick = () => {
    dispatch(increment());
  };

  // const handlePreviousClick = () => {
  //   dispatch(decrement());
  // };

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
          <div className={`${styles.btnContainer} container d-flex`}>
            {/* <Button
              startIcon={<AiFillCaretLeft />}
              onClick={handlePreviousClick}
            >
              Previos
            </Button> */}
            {buttonNextVisible && (
              <Button endIcon={<AiFillCaretRight />} onClick={handleNextClick}>
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
