import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectStatistics = createSelector(
  (state: RootState) => state.statistics,
  (statistics) => statistics
);

export const selectUsersPage = createSelector(
  (state: RootState) => state.statistics.usersPage,
  (page) => page
);

export const selectUserGamesPage = createSelector(
  (state: RootState) => state.statistics.userGamesPage,
  (page) => page
);

export const selectFilterValue = createSelector(
  (state: RootState) => state.statistics.filterValue,
  (filterValue) => filterValue
);

export const selectFindMe = createSelector(
  (state: RootState) => state.statistics.findMe,
  (findMe) => findMe
);
