import { createContext } from "react";

export type AnswerSelectorContextType = {
  disabled: boolean;
  isAnswered: boolean;
  answer: string;
  setAnswer: (id: string) => void;
  checkAnswer: (id: string) => boolean;
  completeAnswer: () => void;
};

const initialState = {
  disabled: false,
  isAnswered: false,
  answer: "",
  setAnswer: () => {},
  checkAnswer: () => false,
  completeAnswer: () => {},
};

export const AnswerSelectorContext =
  createContext<AnswerSelectorContextType>(initialState);
