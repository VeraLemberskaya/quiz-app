import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../../services/apiSlice";

import { UserSliceState, User, Credentials } from "./types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSavedUser: builder.query<User, void>({
      query: () => "/users/get-saved-user",
    }),
    authenticateUser: builder.mutation<User, Credentials>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<
      string,
      { name: string; surname: string } & Credentials
    >({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation<
      User,
      { id: string; name: string; surname: string; email: string }
    >({
      query: ({ id, ...data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    saveUser: builder.mutation<string, User>({
      query: ({ id }) => ({
        url: "/users/save-user",
        method: "POST",
        body: { id },
      }),
    }),
    updatePassword: builder.mutation<string, { id: string; password: string }>({
      query: (data) => ({
        url: "users/change-password",
        method: "POST",
        body: data,
      }),
    }),
    checkPassword: builder.mutation<string, { id: string; password: string }>({
      query: (data) => ({
        url: "users/check-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

const initialState: UserSliceState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.authenticateUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.updateUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.getSavedUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const {
  useAuthenticateUserMutation,
  useSaveUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useGetSavedUserQuery,
  useCheckPasswordMutation,
} = userApiSlice;

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
