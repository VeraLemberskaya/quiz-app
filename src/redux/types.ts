import { User } from "./user/types";

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
