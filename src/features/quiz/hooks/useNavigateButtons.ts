import { useState, useEffect } from "react";

import { useQuiz } from "./useQuiz";
import { useQuizQuestion } from "./useQuizQuestion";

export const useNavigateButtons = () => {
  const [btnPreviousActive, setBtnPreviousActive] = useState<boolean>(true);
  const [btnNextActive, setBtnNextActive] = useState<boolean>(true);

  const { isResultsMode } = useQuiz();

  const {
    questionState: { isLast, isFirst, isAnswered },
  } = useQuizQuestion();

  useEffect(() => {
    setBtnNextActive(!isLast);
  }, [isLast]);

  useEffect(() => {
    setBtnPreviousActive(!isFirst);
  }, [isFirst]);

  useEffect(() => {
    if (!isResultsMode) {
      if (isAnswered && !isLast) {
        setBtnNextActive(true);
      } else {
        setBtnNextActive(false);
      }
    }
  }, [isAnswered, isLast, isResultsMode]);

  return {
    btnPreviousActive,
    btnNextActive,
    setBtnPreviousActive,
    setBtnNextActive,
  };
};
