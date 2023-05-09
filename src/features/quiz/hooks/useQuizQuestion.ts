import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";

import { useAppSelector } from "../../../store/hooks";

import {
  selectAnsweredQuestionIds,
  selectCurrentQuestion,
} from "../store/quizSelectors";
import { setAnswered } from "../store/quizReducer";

import { useQuiz } from "./useQuiz";
import { useQuestionIndex } from "./useQuestionIndex";

export const useQuizQuestion = () => {
  const { index } = useQuestionIndex();
  const { questionCount } = useQuiz();

  const { question: currentQuestion, userAnswer } = useAppSelector(
    selectCurrentQuestion
  );
  const answeredQuestions = useAppSelector(selectAnsweredQuestionIds);

  const dispatch = useDispatch();

  const isAnswered: boolean = useMemo(
    () => !!userAnswer || answeredQuestions.includes(currentQuestion.id),
    [userAnswer, answeredQuestions, currentQuestion.id]
  );

  const isLast: boolean = useMemo(
    () => index === questionCount - 1,
    [index, questionCount]
  );

  const isFirst: boolean = useMemo(() => index === 0, [index]);

  const questionState = {
    isAnswered,
    isFirst,
    isLast,
  };

  const setIsAnswered = useCallback(() => {
    dispatch(setAnswered());
  }, [dispatch]);

  return {
    answer: userAnswer,
    currentQuestion,
    questionState,
    setIsAnswered,
  };
};
