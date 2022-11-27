import { useQuiz } from "./useQuiz";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

import { getExpiryTimestamp } from "../../../utils/getExpiryTimestamp";
import { useQuizQuestion } from "./useQuizQuestion";

export const useQuizTimer = ({
  expiryTime,
  onExpire,
}: {
  expiryTime: number;
  onExpire: () => void;
}) => {
  const timerResult = useTimer({
    expiryTimestamp: getExpiryTimestamp(expiryTime),
    onExpire,
  });

  const { restart, pause } = timerResult;

  const { isResultsMode } = useQuiz();

  const {
    questionState: { isAnswered },
  } = useQuizQuestion();

  useEffect(() => {
    if (!isResultsMode) {
      if (isAnswered) {
        pause();
      } else {
        restart(getExpiryTimestamp(expiryTime));
      }
    }
  }, [isAnswered, expiryTime, pause, restart, isResultsMode]);

  return timerResult;
};
