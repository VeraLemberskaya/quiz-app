import React, { useEffect, useState } from "react";

import Loader from "../../components/UI/Loader";
import FadeTransition from "../../components/Utils/FadeTransition";
import { useAppDispatch } from "../../services/hooks";
import QuizAnswerSelector from "../../features/quiz/components/QuizAnswerSelector";
import LoseModal from "../../features/quiz/components/LoseModal";
import NavigateButtons from "../../features/quiz/components/NavigateButtons";
import QuizModal from "../../features/quiz/components/QuizModal";
import QuizProvider from "../../features/quiz/components/QuizProvider";
import QuizStepper from "../../features/quiz/components/QuizStepper";
import QuizTimer from "../../features/quiz/components/QuizTimer";
import { useQuiz } from "../../features/quiz/hooks/useQuiz";
import styles from "./quiz.module.scss";
import { resetCurrentQuestion } from "../../features/quiz/services/slice";

type Props = {
  isResultPage?: boolean;
};

const Quiz: React.FC<Props> = ({ isResultPage = false }) => {
  const [loseModalOpened, setLoseModalOpened] = useState<boolean>(false);
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const quizResult = useQuiz({ resultsViewMode: isResultPage });

  const { resultsViewMode, isCompleted, reload, isLoading } = quizResult;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetCurrentQuestion());
  }, [resultsViewMode]);

  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => setModalOpened(true), 2000);
    }
  }, [isCompleted]);

  return isLoading ? (
    <Loader />
  ) : (
    <QuizProvider {...quizResult}>
      <div className={styles.quizBody}>
        <div className="mt-5">
          <QuizStepper />
          <QuizAnswerSelector />
        </div>
        <div className="container position-relative mt-5 mb-4">
          <QuizTimer onExpire={() => setLoseModalOpened(true)} />
          <NavigateButtons />
          {!resultsViewMode && (
            <>
              <FadeTransition
                inProp={modalOpened}
                timeout={300}
                styles={styles}
              >
                <QuizModal />
              </FadeTransition>
              <FadeTransition
                inProp={loseModalOpened}
                timeout={300}
                styles={styles}
              >
                <LoseModal
                  onStartAgain={() => {
                    setLoseModalOpened(false);
                    reload();
                  }}
                />
              </FadeTransition>
            </>
          )}
        </div>
      </div>
    </QuizProvider>
  );
};

export default Quiz;
