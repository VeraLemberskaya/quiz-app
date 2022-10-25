import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

export const selectRouter = (state: RootState) => state.router;

export const selectLocation = createSelector(
  selectRouter,
  (router) => router.location
);

export const selectUserGameSearchParams = createSelector(
  selectLocation,
  (location) => {
    const search = new URLSearchParams(location.search);
    const userId = search.get("userId");
    const gameId = search.get("gameId");

    return userId && gameId ? { userId, gameId } : null;
  }
);

export const selectTopicsSearchParams = createSelector(
  selectLocation,
  (location) => {
    const search = new URLSearchParams(location.search);
    const topics = search.get("topics")?.split(",");

    return topics;
  }
);
