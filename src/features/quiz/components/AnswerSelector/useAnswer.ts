import { useState, useCallback, useMemo } from "react";

type AnswerStatus = "none" | "loading" | "fulfilled";

export const useAnswer = (initialAnswer: string | null) => {
  const [answer, setAnswerState] = useState<string>(initialAnswer ?? "");
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(
    initialAnswer ? "fulfilled" : "none"
  );

  const setAnswer = useCallback((answer: string) => {
    setAnswerState(answer);
    setAnswerStatus("loading");
  }, []);

  const completeAnswer = useCallback(() => {
    setAnswerStatus("fulfilled");
  }, [setAnswerStatus]);

  const isAnswered = useMemo(
    () => answerStatus === "fulfilled",
    [answerStatus]
  );

  return {
    answer,
    isAnswered,
    setAnswer,
    completeAnswer,
  };
};
