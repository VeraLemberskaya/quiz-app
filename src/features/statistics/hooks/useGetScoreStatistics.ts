import { useGetScoreStatisticsQuery } from "../services/slice";

export const useGetScoreStatistics = (type: "users" | "games") => {
  const queryResult = useGetScoreStatisticsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      data: type === "users" ? data?.users : data?.games,
      ...rest,
    }),
  });

  return queryResult;
};
