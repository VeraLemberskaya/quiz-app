import { FC, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../../../../store/hooks";

import { useGetQuizByIdQuery } from "../../quizService";
import { resetQuiz, setQuiz, setResultMode } from "../../store/quizReducer";
import Quiz from "../Quiz";

const QuizReview: FC = () => {
  const [quizSuccess, setQuizSuccess] = useState<boolean>(false);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data, isSuccess } = useGetQuizByIdQuery(id!);

  useEffect(() => {
    if (isSuccess) {
      const { quiz } = data;

      dispatch(resetQuiz());
      dispatch(setResultMode(true));
      dispatch(setQuiz(quiz));

      setQuizSuccess(true);
    }
  }, [isSuccess, dispatch, data]);

  if (!id) {
    return <Navigate to="/" />;
  }

  return quizSuccess ? <Quiz /> : null;
};

export default QuizReview;
