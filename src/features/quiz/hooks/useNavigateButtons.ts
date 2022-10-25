import { useState, useEffect } from "react";

import { useQuizContext } from "../contexts/QuizContext";

const ANIMATION_TIME = {
  success: 1200,
  error: 2500,
};

export const useNavigateButtons = () => {
  const [btnPreviousActive, setBtnPreviousActive] = useState<boolean>(true);
  const [btnNextActive, setBtnNextActive] = useState<boolean>(true);

  const {
    resultsViewMode,
    currentQuestionState: { isLast, isFirst, isAnswered, isCorrect },
  } = useQuizContext();

  useEffect(() => {
    setBtnNextActive(!isLast);
  }, [isLast]);

  useEffect(() => {
    setBtnPreviousActive(!isFirst);
  }, [isFirst]);

  useEffect(() => {
    if (!resultsViewMode) {
      if (isAnswered && !isLast) {
        setTimeout(
          () => setBtnNextActive(true),
          isCorrect ? ANIMATION_TIME.success : ANIMATION_TIME.error
        );
      } else {
        setBtnNextActive(false);
      }
    }
  }, [isAnswered, isCorrect, isLast, resultsViewMode]);

  return {
    btnPreviousActive,
    btnNextActive,
    setBtnPreviousActive,
    setBtnNextActive,
  };
};
