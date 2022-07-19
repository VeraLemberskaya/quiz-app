import React, { useEffect, useState } from "react";

import styles from "./quiz.module.scss";
import { Button, Loader } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { decrement, increment, initQuiz } from "../../../redux/quiz/slice";
import {
  selectCurrentQuestion,
  selectQuizStatus,
} from "../../../redux/quiz/selectors";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import AnswerSelector from "./AnswerSelector";

const Quiz: React.FC = () => {
  const status = useAppSelector(selectQuizStatus);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const dispatch = useAppDispatch();

  const handleAnswerSelect = (data: { id: string; answer: number }) => {
    //something
  };

  const handleNextClick = () => {
    dispatch(increment());
  };

  const handlePreviousClick = () => {
    dispatch(decrement());
  };

  useEffect(() => {
    dispatch(initQuiz());
  }, []);

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className={styles.quizBody}>
          <AnswerSelector id={currentQuestion.id} onSelect={handleAnswerSelect}>
            <AnswerSelector.Question img={currentQuestion.img}>
              {currentQuestion.question}
            </AnswerSelector.Question>
            <AnswerSelector.AnswersContainer>
              {currentQuestion.answers.map((answer, index) => (
                <AnswerSelector.Answer
                  key={JSON.stringify(answer)}
                  index={index}
                >
                  {answer}
                </AnswerSelector.Answer>
              ))}
            </AnswerSelector.AnswersContainer>
          </AnswerSelector>
          <div className={`${styles.btnContainer} container d-flex`}>
            <Button
              startIcon={<AiFillCaretLeft />}
              onClick={handlePreviousClick}
            >
              Previos
            </Button>
            <Button endIcon={<AiFillCaretRight />} onClick={handleNextClick}>
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
