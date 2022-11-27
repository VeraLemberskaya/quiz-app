import { useCallback } from "react";

import { selectIndex } from "../store/quizSelectors";
import {
  decrementQuestionIndex,
  incrementQuestionIndex,
  setQuestionIndex,
} from "../store/quizReducer";

import { useAppSelector, useAppDispatch } from "./../../../store/hooks";

export const useQuestionIndex = () => {
  const index = useAppSelector(selectIndex);

  const dispatch = useAppDispatch();

  const setIndex = useCallback(
    (index: number) => {
      dispatch(setQuestionIndex(index));
    },
    [dispatch]
  );

  const incrementIndex = useCallback(() => {
    dispatch(incrementQuestionIndex());
  }, [dispatch]);

  const decrementIndex = useCallback(() => {
    dispatch(decrementQuestionIndex());
  }, [dispatch]);

  return {
    index,
    setIndex,
    incrementIndex,
    decrementIndex,
  };
};
