import { createContext, useContext } from "react";

export type AnswerSelectorContextType = {
  answer: number | null;
  correctAnswer: number;
  setAnswer: (answer: number) => void;
};

export const AnswerSelectorContext =
  createContext<AnswerSelectorContextType | null>(null);

export const useAnswerSelectorContext = () => {
  const context = useContext(AnswerSelectorContext);
  if (!context) {
    throw new Error(
      "Compound components should be used only inside parent component."
    );
  }
  return context;
};
