import { createContext, useContext } from "react";

export type CurrentQuestionState = {
  isLast: boolean;
  isFirst: boolean;
  isCorrect: boolean;
  isAnswered: boolean;
};

export type QuizContextType = {
  resultsViewMode: boolean;
  setResultsViewMode: (mode: boolean) => void;
  reload: () => void;
  isLoading: boolean;
  isCompleted: boolean;
  currentQuestionState: CurrentQuestionState;
};

const initialState: QuizContextType = {
  resultsViewMode: false,
  setResultsViewMode: () => {},
  reload: () => {},
  isLoading: true,
  isCompleted: false,
  currentQuestionState: {
    isLast: false,
    isFirst: false,
    isCorrect: false,
    isAnswered: false,
  },
};

export const QuizContext = createContext<QuizContextType>(initialState);

export const useQuizContext = () => useContext(QuizContext);
