import { apiSlice } from "../../api/apiSlice";
import { MessageResponse } from "../../types/types";

import { logout, setAuth } from "./store/authReducer";
import {
  ActivateRequest,
  LoginRequest,
  AuthResponse,
  RegisterRequest,
} from "./types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<MessageResponse, RegisterRequest>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    verify: builder.query<MessageResponse, ActivateRequest>({
      query: ({ userId, token }) => `auth/activate/${userId}/${token}`,
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const { accessToken: token, user } = data;

        dispatch(setAuth({ token, user }));
      },
    }),
    logout: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(logout());
      },
    }),
    verifyToken: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "auth/verify-token",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyQuery,
  useLogoutMutation,
  useVerifyTokenMutation,
} = authApiSlice;
