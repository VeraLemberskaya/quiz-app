import { useAppSelector } from "../../../services/hooks";
import {
  selectTopicsSearchParams,
  selectUserGameSearchParams,
} from "../../../services/router/selectors";
import { useGetQuizQuery, useGetUserGameQuery } from "../services/slice";

export const useGetQuiz = () => {
  const topicsParams = useAppSelector(selectTopicsSearchParams);
  const userGameParams = useAppSelector(selectUserGameSearchParams);

  const isUserGamePage = !!userGameParams;

  const quizResult = useGetQuizQuery(topicsParams ?? [], {
    skip: isUserGamePage || !topicsParams,
    refetchOnMountOrArgChange: true,
  });

  const userGameResult = useGetUserGameQuery(
    userGameParams ?? { userId: "", gameId: "" },
    {
      skip: !isUserGamePage || !userGameParams,
    }
  );

  return isUserGamePage ? userGameResult : quizResult;
};
