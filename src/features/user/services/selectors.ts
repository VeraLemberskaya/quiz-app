import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../services/store";

export const selectCurrentUser = createSelector(
  (state: RootState) => state.user.user,
  (user) => user
);
