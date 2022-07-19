import React, { useEffect, useMemo, useRef, useState } from "react";

import Answer from "./Answer/Answer";
import AnswersContainer from "./AnswersContainer";
import Question from "./Question";
import { AnswerSelectorContext, AnswerSelectorContextType } from "./context";

type Props = {
  id: string;
  onSelect?: (answer: number) => void;
  correctAnswer: number;
  children: React.ReactNode;
};

const AnswerSelector = ({ id, onSelect, correctAnswer, children }: Props) => {
  const [answer, setAnswer] = useState<number | null>(null);

  useEffect(() => {
    setAnswer(null);
  }, [id]);

  useEffect(() => {
    if (answer != null && onSelect) {
      onSelect(answer);
    }
  }, [answer]);

  const value: AnswerSelectorContextType = useMemo(
    () => ({
      answer,
      correctAnswer,
      setAnswer: (answer: number) => {
        setAnswer(answer);
      },
    }),
    [answer, setAnswer]
  );

  return (
    <AnswerSelectorContext.Provider value={value}>
      <div>{children}</div>
    </AnswerSelectorContext.Provider>
  );
};

export default AnswerSelector;

AnswerSelector.Question = Question;
AnswerSelector.AnswersContainer = AnswersContainer;
AnswerSelector.Answer = Answer;
