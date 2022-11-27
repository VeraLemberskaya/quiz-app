import { useState, useCallback, useMemo } from "react";

type AnswerStatus = "none" | "loading" | "fulfilled";

export const useAnswer = (isResultMode: boolean) => {
  const [answer, setAnswerState] = useState<string>("");
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>("none");

  const resetAnswer = useCallback(() => {
    setAnswerState("");
    setAnswerStatus("none");
  }, [setAnswerState]);

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
    resetAnswer,
    completeAnswer,
  };
};
