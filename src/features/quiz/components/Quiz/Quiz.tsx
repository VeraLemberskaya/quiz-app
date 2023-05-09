import React, { useEffect, useState } from "react";

import FadeTransition from "../../../../components/Utils/FadeTransition";
import { useAppDispatch } from "../../../../store/hooks";
import QuizAnswerSelector from "../QuizAnswerSelector";
import NavigateButtons from "../NavigateButtons";
import QuizStepper from "../QuizStepper/QuizStepper";

import QuizModal from "../QuizModal";

import { setResultMode } from "../../store/quizReducer";

import { useQuizQuestion } from "../../hooks/useQuizQuestion";

import QuizTimer from "../QuizTimer";

import LoseModal from "../LoseModal";

import styles from "./quiz.module.scss";

type Props = {
  resultMode?: boolean;
  onStartAgain?: () => void;
};

const Quiz: React.FC<Props> = ({ resultMode = false, onStartAgain }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isLost, setIsLost] = useState<boolean>(false);

  const {
    currentQuestion: { id },
    questionState: { isLast, isAnswered },
  } = useQuizQuestion();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setResultMode(resultMode));
  }, [dispatch, resultMode]);

  useEffect(() => {
    if (!resultMode) {
      if (isLast && isAnswered) {
        setIsModalOpened(true);
      }
    }
  }, [isLast, isAnswered, resultMode]);

  const handleTimerExpire = () => {
    setIsLost(true);
  };

  const handleStartAgain = () => {
    setIsLost(false);
    onStartAgain && onStartAgain();
  };

  return (
    <div className={styles.quizBody}>
      <div className="mt-5">
        <QuizStepper />
        <QuizAnswerSelector />
      </div>
      <div className="container position-relative mt-5 pb-5">
        <NavigateButtons />
        {!resultMode && <QuizTimer key={id} onExpire={handleTimerExpire} />}
        {isModalOpened && (
          <FadeTransition inProp={isModalOpened} timeout={300} styles={styles}>
            <QuizModal />
          </FadeTransition>
        )}
        {isLost && (
          <FadeTransition inProp={isLost} timeout={300} styles={styles}>
            <LoseModal onStartAgain={handleStartAgain} />
          </FadeTransition>
        )}
      </div>
    </div>
  );
};

export default Quiz;
