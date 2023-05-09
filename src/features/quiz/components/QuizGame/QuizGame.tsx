import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAppDispatch } from "../../../../store/hooks";
import { useQuizTopic } from "../../hooks/useQuizTopic";

import { useGetQuizQuery } from "../../quizService";
import { resetQuiz, setQuiz } from "../../store/quizReducer";
import Quiz from "../Quiz";

const QuizGame: FC = () => {
  const [quizSuccess, setQuizSuccess] = useState<boolean>(false);

  const { topicId } = useQuizTopic();
  const dispatch = useAppDispatch();

  const { data, isSuccess, refetch } = useGetQuizQuery(topicId, {
    skip: !topicId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetQuiz());
      dispatch(setQuiz(data));

      setQuizSuccess(true);
    }
  }, [isSuccess, dispatch, data]);

  if (!topicId) {
    return <Navigate to="/" />;
  }

  return quizSuccess ? <Quiz onStartAgain={refetch} /> : null;
};

export default QuizGame;
