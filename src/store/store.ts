import { configureStore } from "@reduxjs/toolkit";

import quiz from "../features/quiz/services/slice";
import statistics from "../features/statistics/services/slice";
import router from "./router/reducer";
import loader from "./loader/reducer";
import auth from "../features/auth/store/authReducer";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    quiz,
    statistics,
    router,
    loader,
    auth,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
