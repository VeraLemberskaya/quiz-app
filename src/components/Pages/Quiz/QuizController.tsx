import { FC, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectCurrentIndex,
  selectQuizTopics,
} from "../../../redux/quiz/selectors";
import { setTopics, useGetQuizQuery } from "../../../redux/quiz/slice";
import { Question } from "../../../redux/quiz/types";
import Quiz from "./Quiz";

type LocationState = {
  isResultPage: boolean;
} | null;

const QuizController: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentIndex = useAppSelector(selectCurrentIndex);

  const isResultPage =
    (useLocation().state as LocationState)?.isResultPage ?? false;

  const {
    data: currentQuestion,
    refetch,
    isFetching,
  } = useGetQuizQuery(useAppSelector(selectQuizTopics), {
    selectFromResult: ({ data, ...rest }) => ({
      data: data?.[currentIndex],
      ...rest,
    }),
  });

  useEffect(() => {
    const topics = searchParams.get("topics")?.split(",");
    if (topics) {
      dispatch(setTopics(topics));
      refetch();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Quiz
      isResultPage={isResultPage}
      isLoading={isFetching}
      refetch={refetch}
      currentQuestion={currentQuestion as Question}
    />
  );
};

export default QuizController;
