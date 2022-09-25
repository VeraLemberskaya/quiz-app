import { configureStore } from "@reduxjs/toolkit";

import quiz from "../features/quiz/services/slice";
import user from "../features/user/services/slice";
import statistics from "../features/statistics/services/slice";
import router from "./router/slice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    quiz,
    user,
    statistics,
    router,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
