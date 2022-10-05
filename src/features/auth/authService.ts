import { apiSlice } from "../../api/apiSlice";
import { MessageResponse, User } from "../../types/types";
import { logout, setCredentials, setUser } from "./store/authReducer";
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
        const { accessToken, user } = data;

        dispatch(setCredentials(accessToken, user));
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
    refresh: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const { accessToken, user } = data;

        dispatch(setCredentials(accessToken, user));
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyQuery,
  useLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
