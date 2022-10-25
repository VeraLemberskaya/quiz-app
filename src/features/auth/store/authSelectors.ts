import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../../store/store";

export const selectAuth = (state: RootState) => state.auth;

export const selectToken = createSelector(
  selectAuth,
  (authState) => authState.token
);

export const selectUser = createSelector(
  selectAuth,
  (authState) => authState.user
);
