import { FC, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import Quiz from "../Quiz";
import { selectCurrentIndex, selectQuizTopics } from "../services/selectors";
import { useGetQuizQuery, setTopics } from "../services/slice";
import { Question } from "../services/types";

type LocationState = {
  isResultPage: boolean;
} | null;

const QuizController: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentIndex = useAppSelector(selectCurrentIndex);
  const topics = useAppSelector(selectQuizTopics);

  const isResultPage =
    (useLocation().state as LocationState)?.isResultPage ?? false;

  const {
    data: currentQuestion,
    refetch,
    isFetching,
  } = useGetQuizQuery(searchParams.get("topics")?.split(",") ?? topics, {
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
