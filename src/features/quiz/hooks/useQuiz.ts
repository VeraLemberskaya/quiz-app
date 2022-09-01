import { useState } from "react";

import { QuizContextType } from "../contexts/QuizContext";
import { useGetQuiz } from "./useGetQuiz";
import { useWatchCurrentQuestion } from "./useWatchCurrentQuestion";

export const useQuiz = ({
  resultsViewMode: resultsMode,
}: {
  resultsViewMode: boolean;
}): QuizContextType => {
  const [resultsViewMode, setResultsViewMode] = useState<boolean>(resultsMode);

  const result = useGetQuiz();

  const currentQuestionState = useWatchCurrentQuestion();

  return {
    resultsViewMode,
    setResultsViewMode,
    reload: result.refetch,
    isLoading: result.isFetching,
    currentQuestionState,
    isCompleted: currentQuestionState.isLast && currentQuestionState.isAnswered,
  };
};
