import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "../store/store";
import { logout, setToken } from "../features/auth/store/authReducer";
import { RefreshResponse } from "../features/auth/types";

export type FetchError = {
  data: {
    message: string;
  };
  status: number | string;
};

type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchError>;

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
}) as BaseQuery;

const baseQueryWithReauth =
  (baseQuery: BaseQuery): BaseQuery =>
  async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

      if (refreshResult?.data) {
        const { accessToken } = refreshResult.data as RefreshResponse;

        api.dispatch(setToken(accessToken));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());

        return refreshResult;
      }
    }
    return result;
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth(baseQuery),
  tagTypes: ["Settings"],
  endpoints: () => ({}),
});
