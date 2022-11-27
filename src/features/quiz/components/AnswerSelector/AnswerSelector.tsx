import React, { useCallback, useEffect, useMemo } from "react";

import Answer from "./Answer/Answer";
import AnswersContainer from "./AnswersContainer";
import Question from "./Question";
import {
  AnswerSelectorContext,
  AnswerSelectorContextType,
} from "./AnswerSelectorContext";
import { useAnswer } from "./useAnswer";

type Props = {
  questionId: string;
  onAnswerSelect: (answer: string) => void;
  //answer: number;
  correctAnswer: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const AnswerSelector = ({
  questionId,
  onAnswerSelect,
  //answer: answerIndex,
  correctAnswer,
  children,
  disabled = false,
}: Props) => {
  const { answer, isAnswered, setAnswer, resetAnswer, completeAnswer } =
    useAnswer(disabled);

  useEffect(() => {
    resetAnswer();
  }, [questionId, resetAnswer]);

  useEffect(() => {
    if (isAnswered) {
      onAnswerSelect(answer);
    }
  }, [isAnswered, answer, onAnswerSelect]);

  const checkAnswer = useCallback(
    (id: string) => id === correctAnswer,
    [correctAnswer]
  );

  const value: AnswerSelectorContextType = useMemo(
    () => ({
      disabled,
      isAnswered,
      answer,
      setAnswer,
      completeAnswer,
      checkAnswer,
    }),
    [disabled, isAnswered, answer, setAnswer, checkAnswer, completeAnswer]
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
