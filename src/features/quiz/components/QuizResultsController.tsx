import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../services/hooks";
import Quiz from "../Quiz";
import { selectCurrentIndex } from "../services/selectors";
import { useGetUserGameQuery } from "../services/slice";
import { Question } from "../services/types";

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
