import React, { useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";

import styles from "./quiz.module.scss";
import { Button, Loader, Stepper } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  resetQuiz,
  increment,
  initQuiz,
  setAnswer,
} from "../../../redux/quiz/slice";
import {
  selectCurrentQuestion,
  selectQuizData,
  selectQuizScore,
} from "../../../redux/quiz/selectors";
import AnswerSelector from "../../AnswerSelector";
import { QUESTIONS_NUMBER } from "../../../constants";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";

const Quiz: React.FC = () => {
  const [btnNextActive, setBtnNextActive] = useState<boolean>(false);
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const { status, currentIndex } = useAppSelector(selectQuizData);
  const totalScore = useAppSelector(selectQuizScore);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state: isResultPage } = useLocation();

  const handleAnswerSelect = (answer: number) => {
    dispatch(setAnswer(currentQuestion.id, answer));
    if (currentIndex < QUESTIONS_NUMBER - 1) {
      if (answer === currentQuestion.correctAnswer) {
        setTimeout(() => {
          setBtnNextActive(true);
        }, 1200);
      } else {
        setTimeout(() => {
          setBtnNextActive(true);
        }, 2500);
      }
    } else {
      setTimeout(() => {
        setModalOpened(true);
      }, 2000);
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
          {/* <Stepper stepsCount={5} activeStep={1} /> */}
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
          <CSSTransition
            in={modalOpened}
            timeout={1000}
            classNames={{
              enter: styles.modalEnter,
              enterActive: styles.modalEnterActive,
            }}
            mountOnEnter
            unmountOnExit
          >
            <Modal
              score={totalScore}
              onComplete={() => {
                dispatch(resetQuiz());
                navigate("/");
              }}
              onCheckResult={() => {
                navigate("/results", {
                  state: {
                    isResultPage: true,
                  },
                });
              }}
            />
          </CSSTransition>
        </div>
      )}
    </>
  );
};

export default Quiz;
