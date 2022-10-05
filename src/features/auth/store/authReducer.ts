import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/types";
import { AuthState } from "../types";

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: {
      reducer(state, action: PayloadAction<AuthState>) {
        const { user, token } = action.payload;
        state.token = token;
        state.user = user;
      },
      prepare(token: string | null, user: User | null) {
        return { payload: { token, user } };
      },
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
