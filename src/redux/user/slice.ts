import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserSliceState, User } from "./types";

const initialState: UserSliceState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
