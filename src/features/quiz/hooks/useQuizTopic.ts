import { useCallback } from "react";

import { setTopic } from "../store/quizReducer";

import { selectTopic } from "./../store/quizSelectors";
import { useAppSelector, useAppDispatch } from "./../../../store/hooks";

export const useQuizTopic = () => {
  const topicId = useAppSelector(selectTopic);

  const dispatch = useAppDispatch();

  const setQuizTopic = useCallback(
    (id: string) => {
      dispatch(setTopic(id));
    },
    [dispatch]
  );

  return {
    topicId,
    setQuizTopic,
  };
};
