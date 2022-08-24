import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import { Game } from "../quiz/types";
import { User } from "../user/types";
import {
  FilterValue,
  ListResponse,
  StatisticsData,
  StatisticsSliceState,
} from "./types";

export const statisticsApiSlice = apiSlice.injectEndpoints({
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

const initialState: StatisticsSliceState = {
  usersPage: 0,
  userGamesPage: 0,
  filterValue: "score",
  findMe: false,
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
  },
});

export const { setUsersPage, setUserGamesPage, setFilterValue, setFindMe } =
  statisticsSlice.actions;

export const {
  useGetStatisticsDataQuery,
  useGetUserListQuery,
  useGetUserGamesListQuery,
} = statisticsApiSlice;

export default statisticsSlice.reducer;
