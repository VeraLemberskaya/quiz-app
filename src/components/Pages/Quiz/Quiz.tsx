import React, { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";

import styles from "./quiz.module.scss";
import { Button, Loader, Stepper } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  resetQuiz,
  increment,
  initQuiz,
  setAnswer,
  resetCurrentQuestion,
  decrement,
  setQuestionIndex,
} from "../../../redux/quiz/slice";
import {
  selectCurrentQuestion,
  selectQuizData,
} from "../../../redux/quiz/selectors";
import AnswerSelector from "./AnswerSelector";
import { QUESTIONS_NUMBER } from "../../../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QuizModal from "./QuizModal";

type LocationState = {
  isResultPage: boolean;
} | null;

const Quiz: React.FC = () => {
  const [btnPreviousActive, setBtnPreviousActive] = useState<boolean>(false);
  const [btnNextActive, setBtnNextActive] = useState<boolean>(false);
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const { status, currentIndex, answers } = useAppSelector(selectQuizData);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isResultPage =
    (useLocation().state as LocationState)?.isResultPage ?? false;

  useEffect(() => {
    if (!isResultPage) {
      dispatch(initQuiz());
    }
  }, []);

  useEffect(() => {
    if (isResultPage) {
      dispatch(resetCurrentQuestion());
    }
  }, [isResultPage]);

  useEffect(() => {
    if (isResultPage) {
      if (currentIndex === 0) {
        setBtnPreviousActive(false);
      } else {
        setBtnPreviousActive(true);
      }
      if (currentIndex === QUESTIONS_NUMBER - 1) {
        setBtnNextActive(false);
      } else setBtnNextActive(true);
    } else {
      setBtnNextActive(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isResultPage && !currentQuestion) {
      navigate("/");
    }
  }, [currentQuestion]);

  const handleBtnNextClick = () => {
    dispatch(increment());
  };

  const handleBtnPreviousClick = () => {
    dispatch(decrement());
  };

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

  const handleStepChange = (index: number) => {
    dispatch(setQuestionIndex(index));
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className={styles.quizBody}>
          <div className="mt-5">
            <Stepper
              stepCount={QUESTIONS_NUMBER}
              activeStep={currentIndex}
              onStepChange={handleStepChange}
              disabled={!isResultPage}
            />
            <AnswerSelector
              id={currentQuestion.id}
              onSelect={handleAnswerSelect}
              answer={answers[currentQuestion.id]}
              correctAnswer={currentQuestion.correctAnswer}
              mode={isResultPage ? "review" : "selection"}
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
          </div>
          <div className="container mt-5 mb-4">
            <div className={styles.btnContainer}>
              <div>
                {isResultPage && (
                  <Button
                    onClick={handleBtnPreviousClick}
                    buttonType="outlined"
                    buttonSize="large"
                    startIcon={<AiFillCaretLeft />}
                    disabled={!btnPreviousActive}
                  >
                    Previous
                  </Button>
                )}
              </div>
              <div>
                {isResultPage && (
                  <Link
                    to="/"
                    onClick={() => {
                      dispatch(resetQuiz());
                    }}
                    className={`${styles.backToMenuBtn} me-5`}
                  >
                    <Button buttonSize="large">Back to menu</Button>
                  </Link>
                )}
                <Button
                  onClick={handleBtnNextClick}
                  buttonType="primary"
                  buttonSize="large"
                  endIcon={<AiFillCaretRight />}
                  disabled={!btnNextActive}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          <CSSTransition
            in={!isResultPage && modalOpened}
            timeout={300}
            classNames={{
              enter: styles.modalEnter,
              enterActive: styles.modalEnterActive,
              exit: styles.modalExit,
              exitActive: styles.modalExitActive,
            }}
            mountOnEnter
            unmountOnExit
          >
            <QuizModal />
          </CSSTransition>
        </div>
      )}
    </>
  );
};

export default Quiz;
