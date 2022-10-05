import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { User } from "../../../types/types";
import {
  selectUserGamesListQueryResult,
  selectUserListQueryResult,
} from "./slice";

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

export const selectSelectedUser = createSelector(
  (state: RootState) => state.statistics.selectedUser,
  (selectedUser) => selectedUser
);

const selectUserListFromQuery = (state: RootState) => {
  const page = selectUsersPage(state);
  const orderBy = selectFilterValue(state);
  return selectUserListQueryResult({ page, orderBy })(state).data;
};

export const selectUserList = createSelector(
  selectUserListFromQuery,
  (userList) => userList?.data
);

export const selectUserListTotalPages = createSelector(
  selectUserListFromQuery,
  (userList) => userList?.totalPages
);

const selectUserGamesListFromQuery = (state: RootState) => {
  const page = selectUserGamesPage(state);
  const { id } = selectSelectedUser(state) as User;
  return selectUserGamesListQueryResult({ id, page })(state).data;
};

export const selectUserGamesList = createSelector(
  selectUserGamesListFromQuery,
  (userGamesList) => userGamesList?.data
);

export const selectUserGamesListTotalPages = createSelector(
  selectUserGamesListFromQuery,
  (userGamesList) => userGamesList?.totalPages
);
