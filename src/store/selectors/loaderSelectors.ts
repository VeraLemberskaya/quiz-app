import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

export const selectLoader = (state: RootState) => state.loader;

export const selectIsLoading = createSelector(
  selectLoader,
  (loader) => loader.isLoading
);
