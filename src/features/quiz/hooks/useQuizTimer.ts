import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { getExpiryTimestamp } from "../../../utils/getExpiryTimestamp";
import { useQuizContext } from "../contexts/QuizContext";

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

  const { seconds, restart, pause } = timerResult;

  useEffect(() => {
    console.log(seconds);
  }, [seconds]);

  const {
    resultsViewMode,
    currentQuestionState: { isAnswered },
  } = useQuizContext();

  useEffect(() => {
    if (!resultsViewMode) {
      if (isAnswered) {
        pause();
      } else {
        restart(getExpiryTimestamp(expiryTime));
      }
    }
  }, [isAnswered]);

  return timerResult;
};
