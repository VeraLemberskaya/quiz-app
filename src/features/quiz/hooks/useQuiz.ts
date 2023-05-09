import { useMemo } from "react";

import { useAppSelector } from "../../../store/hooks";
import { selectQuiz, selectIsResultsMode } from "../store/quizSelectors";

export const useQuiz = () => {
  const quiz = useAppSelector(selectQuiz);
  const isResultsMode = useAppSelector(selectIsResultsMode);

  const questionCount = useMemo(() => quiz.questions.length, [quiz]);

  return {
    quiz,
    isResultsMode,
    questionCount,
  };
};
