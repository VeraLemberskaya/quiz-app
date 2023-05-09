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
    autoStart: true,
    expiryTimestamp: getExpiryTimestamp(expiryTime),
    onExpire,
  });

  const { pause } = timerResult;

  const {
    questionState: { isAnswered },
  } = useQuizQuestion();

  useEffect(() => {
    if (isAnswered) {
      pause();
    }
  }, [isAnswered, expiryTime, pause]);

  return timerResult;
};
