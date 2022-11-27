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

  const { data, isSuccess } = useGetQuizQuery(topicId, {
    skip: !topicId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const { quiz } = data;

      dispatch(resetQuiz());
      dispatch(setQuiz(quiz));

      setQuizSuccess(true);
    }
  }, [isSuccess, dispatch, data]);

  if (!topicId) {
    return <Navigate to="/" />;
  }

  //убрать null
  return quizSuccess ? <Quiz /> : null;
};

export default QuizGame;
