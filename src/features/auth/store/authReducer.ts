import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState } from "../types";

import { User } from "../../../types/types";
import { loadAuth } from "../../../services/localStorageService";

const initialState: AuthState = loadAuth() ?? {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, setUser, setToken, logout } = authSlice.actions;

export const { actions } = authSlice;

export default authSlice.reducer;
