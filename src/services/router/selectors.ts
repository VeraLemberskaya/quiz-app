import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectRouter = createSelector(
  (state: RootState) => state.router,
  (router) => router
);

export const selectUserGameSearchParams = createSelector(
  selectRouter,
  (router) => {
    const search = new URLSearchParams(router.location.search);
    const userId = search.get("userId");
    const gameId = search.get("gameId");

    return userId && gameId ? { userId, gameId } : null;
  }
);

export const selectTopicsSearchParams = createSelector(
  selectRouter,
  (router) => {
    const search = new URLSearchParams(router.location.search);
    const topics = search.get("topics")?.split(",");

    return topics;
  }
);
