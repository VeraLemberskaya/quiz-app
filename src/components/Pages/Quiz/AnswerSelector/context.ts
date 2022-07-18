import { createContext, useContext } from "react";

export type AnswerSelectorContextType = {
  id: string;
  setAnswer: (answer: number) => void;
  answer: number | null;
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
