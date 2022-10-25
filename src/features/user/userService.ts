import { setUser } from "../auth/store/authReducer";

import { apiSlice } from "../../api/apiSlice";

import { MessageResponse, User } from "./../../types/types";
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  VerifyRequest,
} from "./types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<User, User>({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: {
          ...user,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setUser(data));
      },
    }),
    updatePassword: builder.mutation<MessageResponse, UpdatePasswordRequest>({
      query: (data) => ({
        url: "/users/password",
        method: "PATCH",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    verifyResetLink: builder.query<MessageResponse, VerifyRequest>({
      query: ({ userId, token }) => `users/reset-password/${userId}/${token}`,
    }),
    resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
      query: ({ userId, token, password, confirmPassword }) => ({
        url: `/users/reset-password/${userId}/${token}`,
        method: "PUT",
        body: {
          password,
          confirmPassword,
        },
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useVerifyResetLinkQuery,
  useResetPasswordMutation,
} = userApiSlice;
