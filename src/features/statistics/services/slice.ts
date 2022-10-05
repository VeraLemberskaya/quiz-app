import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";
import { User } from "../../../types/types";
import { Game } from "../../quiz/services/types";
import {
  FilterValue,
  ListResponse,
  StatisticsData,
  StatisticsSliceState,
  ScoreStatisticsData,
  UserStatisticsResponse,
} from "./types";

export const statisticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatisticsData: builder.query<StatisticsData, void>({
      query: () => "/statistics",
    }),
    getUsersStatistics: builder.query<UserStatisticsResponse, void>({
      query: () => "/statistics/users",
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
    getUserPage: builder.query<
      { page: number },
      { id: string; orderBy: string }
    >({
      query: ({ id, orderBy }) => ({
        url: `users/page/${id}`,
        params: { orderBy },
      }),
    }),
    getScoreStatistics: builder.query<ScoreStatisticsData, void>({
      query: () => "/statistics/score",
    }),
    getGamesStatistics: builder.query<
      { date: string; gameCount: number }[],
      void
    >({
      query: () => "/statistics/games",
    }),
  }),
});

const initialState: StatisticsSliceState = {
  usersPage: 0,
  userGamesPage: 0,
  filterValue: "score",
  findMe: false,
  selectedUser: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setUsersPage: (state, action: PayloadAction<number>) => {
      state.usersPage = action.payload;
    },
    setUserGamesPage: (state, action: PayloadAction<number>) => {
      state.userGamesPage = action.payload;
    },
    setFilterValue: (state, action: PayloadAction<FilterValue>) => {
      state.filterValue = action.payload;
    },
    setFindMe: (state, action: PayloadAction<boolean>) => {
      state.findMe = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const {
  setUsersPage,
  setUserGamesPage,
  setFilterValue,
  setFindMe,
  setSelectedUser,
} = statisticsSlice.actions;

export const {
  useGetStatisticsDataQuery,
  useGetUserListQuery,
  useGetUserGamesListQuery,
  useGetUserPageQuery,
  useGetScoreStatisticsQuery,
  useGetUsersStatisticsQuery,
  useGetGamesStatisticsQuery,
} = statisticsApiSlice;

export const selectUserListQueryResult =
  statisticsApiSlice.endpoints.getUserList.select;

export const selectStatisticsQueryResult =
  statisticsApiSlice.endpoints.getStatisticsData.select();

export const selectUserGamesListQueryResult =
  statisticsApiSlice.endpoints.getUserGamesList.select;

export default statisticsSlice.reducer;
