import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCurrentUser = createSelector(
  (state: RootState) => state.user.user,
  (user) => user
);
