import React, { useEffect, useMemo, useState } from "react";

import Answer from "./Answer/Answer";
import AnswersContainer from "./AnswersContainer";
import Question from "./Question";
import { AnswerSelectorContext, AnswerSelectorContextType } from "./context";

type Props = {
  id: string;
  onSelect: (data: { id: string; answer: number }) => void;
  children: React.ReactNode;
};

const AnswerSelector = ({ id, onSelect, children }: Props) => {
  const [answer, setAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (answer != null) {
      onSelect({ id, answer });
    }
  }, [answer]);

  const value: AnswerSelectorContextType = useMemo(
    () => ({
      answer,
      setAnswer: (answer: number) => {
        setAnswer(answer);
      },
      id,
    }),
    [answer, id, setAnswer]
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
