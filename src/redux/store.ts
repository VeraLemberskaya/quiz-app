import { configureStore } from "@reduxjs/toolkit";

import quiz from "./quiz/slice";
import user from "./user/slice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    quiz,
    user,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
