import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import styles from "./quiz.module.scss";
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
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import QuizModal from "./QuizModal";
import Button from "../../UI/Button";
import Loader from "../../UI/Loader";
import Stepper from "../../UI/Stepper";
import { selectCurrentSettings } from "../../../redux/settings/selectors";
import Timer from "./Timer";
import LoseModal from "./LoseModal";
import { TimerHandle } from "./Timer/Timer";
import FadeTransition from "../../Utils/FadeTransition";

type LocationState = {
  isResultPage: boolean;
} | null;

const Quiz: React.FC = () => {
  const [btnPreviousActive, setBtnPreviousActive] = useState<boolean>(false);
  const [btnNextActive, setBtnNextActive] = useState<boolean>(false);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [loseModalOpened, setLoseModalOpened] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const { status, currentIndex, answers } = useAppSelector(selectQuizData);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const { questionAmount } = useAppSelector(selectCurrentSettings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const timerRef = useRef<TimerHandle>(null);

  const loadQuiz = () => {
    const topics = searchParams.get("topics")?.split(",");
    if (topics) {
      dispatch(initQuiz(topics));
    } else {
      navigate("/");
    }
  };

  const isResultPage =
    (useLocation().state as LocationState)?.isResultPage ?? false;
  useEffect(() => {
    if (!isResultPage) {
      loadQuiz();
    } else {
      if (!currentQuestion) {
        navigate("/");
      }
    }
    return () => {
      dispatch(resetQuiz());
    };
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
      if (currentIndex === questionAmount - 1) {
        setBtnNextActive(false);
      } else setBtnNextActive(true);
    } else {
      setBtnNextActive(false);
    }
  }, [currentIndex]);

  const handleBtnNextClick = () => {
    dispatch(increment());
    timerRef.current?.restart();
  };

  const handleBtnPreviousClick = () => {
    dispatch(decrement());
  };

  const handleAnswerSelect = (answer: number) => {
    timerRef.current?.stop();
    dispatch(setAnswer(currentQuestion.id, answer));
    if (currentIndex < questionAmount - 1) {
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

  const handleTimeExpired = () => {
    setLoseModalOpened(true);
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className={styles.quizBody}>
          <div className="mt-5">
            <Stepper
              stepCount={questionAmount}
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
          <div className="container position-relative mt-5 mb-4">
            {!isResultPage && (
              <div className={styles.timerContainer}>
                <Timer
                  ref={timerRef}
                  expiryTime={20}
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
                loadQuiz();
              }}
            />
          </FadeTransition>
        </div>
      )}
    </>
  );
};

export default Quiz;
