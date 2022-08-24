import { User } from "../user/types";

export type FilterValue = "score" | "games";

export interface ListResponse<T> {
  totalPages: number;
  data: T[];
}

export type StatisticsData = {
  userCount: number;
  totalGames: number;
  totalScore: number;
  winner: User;
};

export type StatisticsSliceState = {
  usersPage: number;
  userGamesPage: number;
  filterValue: FilterValue;
  findMe: boolean;
};
