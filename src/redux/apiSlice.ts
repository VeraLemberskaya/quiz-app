import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../api/constants";
import { Game } from "./quiz/types";
import { Settings } from "./settings/types";
import { StatisticsData, ListResponse } from "./types";
import { User } from "./user/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getStatisticsData: builder.query<StatisticsData, void>({
      query: () => "/statistics",
    }),
    getUserList: builder.query<
      ListResponse<User>,
      { page: number; orderBy: string }
    >({
      query: ({ page, orderBy }) => `/users?page=${page}&orderBy=${orderBy}`,
    }),
    getUserGamesList: builder.query<
      ListResponse<Game>,
      { id: string; page: number }
    >({
      query: ({ id, page }) => `/users/${id}/games?page=${page}`,
    }),
  }),
});

export const {
  useGetStatisticsDataQuery,
  useGetUserListQuery,
  useGetUserGamesListQuery,
} = apiSlice;
