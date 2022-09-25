import React, { FC } from "react";
import { QuizContext, QuizContextType } from "../contexts/QuizContext";

type Props = {
  children: React.ReactNode;
} & QuizContextType;

const QuizProvider: FC<Props> = ({ children, ...contextValue }) => {
  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export default QuizProvider;
