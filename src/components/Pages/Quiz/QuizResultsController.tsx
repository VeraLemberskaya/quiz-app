import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentIndex } from "../../../redux/quiz/selectors";
import { useGetUserGameQuery } from "../../../redux/quiz/slice";
import { Question } from "../../../redux/quiz/types";

import Quiz from "./Quiz";

const QuizResultsController: FC = () => {
  const { userId = "", gameId = "" } = useParams();
  const navigate = useNavigate();
  const currentIndex = useAppSelector(selectCurrentIndex);
  const {
    data: currentQuestion,
    isLoading,
    refetch,
    isError,
  } = useGetUserGameQuery(
    { userId, gameId },
    {
      selectFromResult: ({ data, ...rest }) => ({
        data: data?.quiz[currentIndex],
        ...rest,
      }),
    }
  );

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError]);

  return (
    <Quiz
      isResultPage={true}
      isLoading={isLoading}
      refetch={refetch}
      currentQuestion={currentQuestion as Question}
    />
  );
};

export default QuizResultsController;
