import React, { useEffect, useMemo, useRef, useState } from "react";

import Answer from "./Answer/Answer";
import AnswersContainer from "./AnswersContainer";
import Question from "./Question";
import {
  AnswerSelectorContext,
  AnswerSelectorContextType,
  AnswerSelectorModeType,
} from "./context";

type Props = {
  id: string;
  onSelect?: (answer: number) => void;
  answer?: number;
  correctAnswer: number;
  children: React.ReactNode;
  mode: AnswerSelectorModeType;
};

const AnswerSelector = ({
  id,
  onSelect,
  answer: answerIndex,
  correctAnswer,
  children,
  mode,
}: Props) => {
  const [answer, setAnswer] = useState<number | null>(
    mode === "selection" ? null : answerIndex ?? null
  );

  useEffect(() => {
    if (mode === "review" && answerIndex) {
      setAnswer(answerIndex);
    } else {
      setAnswer(null);
    }
  }, [id]);

  useEffect(() => {
    if (mode === "selection" && answer != null && onSelect) {
      onSelect(answer);
    }
  }, [answer]);

  const value: AnswerSelectorContextType = useMemo(
    () => ({
      mode,
      answer,
      correctAnswer,
      setAnswer: (answer: number) => {
        setAnswer(answer);
      },
    }),
    [answer, setAnswer, mode, correctAnswer]
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
