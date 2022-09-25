import { useMemo } from "react";
import { useAppSelector } from "../../../services/hooks";
import { selectCurrentSettings } from "../../settings/services/selectors";
import { CurrentQuestionState } from "../contexts/QuizContext";
import {
  selectCurrentIndex,
  selectCurrentQuestion,
  selectQuizAnswers,
} from "../services/selectors";

export const useWatchCurrentQuestion = (): CurrentQuestionState => {
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const currentIndex = useAppSelector(selectCurrentIndex);
  const { questionAmount } = useAppSelector(selectCurrentSettings);
  const answers = useAppSelector(selectQuizAnswers);

  const isLast = useMemo(
    () => currentIndex === questionAmount - 1,
    [currentIndex]
  );

  const isFirst = useMemo(() => currentIndex === 0, [currentIndex]);

  const isCorrect = useMemo(
    () =>
      currentQuestion
        ? answers[currentQuestion?.id] === currentQuestion?.correctAnswer
        : false,
    [answers, currentQuestion]
  );

  const isAnswered = useMemo(
    () => (currentQuestion ? !!answers[currentQuestion?.id] : false),
    [answers, currentQuestion]
  );

  return { isLast, isFirst, isCorrect, isAnswered };
};
