import { configureStore } from "@reduxjs/toolkit";

import quiz from "../features/quiz/services/slice";
import statistics from "../features/statistics/services/slice";

import auth from "../features/auth/store/authReducer";

import { apiSlice } from "../api/apiSlice";

import router from "./reducers/routerReducer";
import loader from "./reducers/loaderReducer";
import localStorageMiddleware from "./middleware/localStorageMiddleware";

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
    getDefaultMiddleware().concat(apiSlice.middleware, localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
