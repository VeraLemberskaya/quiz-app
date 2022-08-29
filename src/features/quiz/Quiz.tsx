import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import Stepper from "../../components/UI/Stepper";
import FadeTransition from "../../components/Utils/FadeTransition";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { selectCurrentSettings } from "../settings/services/selectors";
import AnswerSelector from "./components/AnswerSelector";
import Clock from "./components/Clock";
import { ClockHandle } from "./components/Clock/Clock";
import LoseModal from "./components/LoseModal";
import QuizModal from "./components/QuizModal";
import Timer from "./components/Timer";
import { TimerHandle } from "./components/Timer/Timer";
import { useNavigateButtons } from "./hooks/useNavigateButtons";

import styles from "./quiz.module.scss";
import { selectQuizData } from "./services/selectors";
import {
  resetCurrentQuestion,
  increment,
  decrement,
  setAnswer,
  setQuestionIndex,
} from "./services/slice";
import { Question, Time } from "./services/types";

type Props = {
  isLoading: boolean;
  refetch: () => void;
  isResultPage: boolean;
  currentQuestion: Question;
};

const Quiz: React.FC<Props> = ({
  isResultPage,
  isLoading,
  refetch,
  currentQuestion,
}) => {
  const [[btnPreviousActive], [btnNextActive, setBtnNextActive]] =
    useNavigateButtons(isResultPage);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [loseModalOpened, setLoseModalOpened] = useState<boolean>(false);
  const { currentIndex, answers, time } = useAppSelector(selectQuizData);
  const { questionAmount, questionTime } = useAppSelector(
    selectCurrentSettings
  );
  const dispatch = useAppDispatch();

  const timerRef = useRef<TimerHandle>(null);
  const clockRef = useRef<ClockHandle>(null);

  useEffect(() => {
    clockRef.current?.reset();
  }, [currentIndex]);

  useEffect(() => {
    if (isResultPage) {
      dispatch(resetCurrentQuestion());
    }
  }, [isResultPage]);

  const handleBtnNextClick = () => {
    dispatch(increment());
    timerRef.current?.restart();
  };

  const handleBtnPreviousClick = () => {
    dispatch(decrement());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    timerRef.current?.stop();
    const answer = {
      index: answerIndex,
      time: clockRef.current?.currentTime as Time,
    };
    dispatch(setAnswer(currentQuestion.id, answer));
    if (currentIndex < questionAmount - 1) {
      if (answerIndex === currentQuestion.correctAnswer) {
        setTimeout(() => {
          setBtnNextActive(true);
        }, 1200);
      } else {
        setTimeout(() => {
          setBtnNextActive(true);
        }, 2500);
      }
    } else {
      clockRef.current?.pause();
      setTimeout(() => {
        setModalOpened(true);
      }, 2000);
    }
  };

  const handleStepChange = (index: number) => {
    dispatch(setQuestionIndex(index));
  };

  const handleTimeExpired = () => {
    clockRef.current?.pause();
    setLoseModalOpened(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        currentQuestion && (
          <div className={styles.quizBody}>
            <div className="mt-5">
              <div className={styles.stopWatch}>
                <Clock
                  ref={clockRef}
                  time={time}
                  autoStart={!isResultPage}
                  showResult={isResultPage}
                />
              </div>
              <Stepper
                stepCount={questionAmount}
                activeStep={currentIndex}
                onStepChange={handleStepChange}
                disabled={!isResultPage}
              />
              <AnswerSelector
                id={currentQuestion.id}
                onSelect={handleAnswerSelect}
                answer={answers[currentQuestion.id]?.index}
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
            <div className="container position-relative mt-5 mb-4">
              {!isResultPage && (
                <div className={styles.timerContainer}>
                  <Timer
                    ref={timerRef}
                    expiryTime={questionTime}
                    onExpire={handleTimeExpired}
                  />
                </div>
              )}
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
                <div className="d-flex">
                  {isResultPage && (
                    <Link to="/" className={`${styles.backToMenuBtn} me-5`}>
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
            <FadeTransition
              inProp={!isResultPage && modalOpened}
              timeout={300}
              styles={styles}
            >
              <QuizModal />
            </FadeTransition>
            <FadeTransition
              inProp={!isResultPage && loseModalOpened}
              timeout={300}
              styles={styles}
            >
              <LoseModal
                onStartAgain={() => {
                  setLoseModalOpened(false);
                  refetch();
                }}
              />
            </FadeTransition>
          </div>
        )
      )}
    </>
  );
};

export default Quiz;
