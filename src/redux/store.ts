import { configureStore } from "@reduxjs/toolkit";

import quiz from "./quiz/slice";
import user from "./user/slice";

export const store = configureStore({
  reducer: {
    quiz,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
