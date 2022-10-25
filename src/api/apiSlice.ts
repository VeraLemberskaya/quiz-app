import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

import { RootState } from "../store/store";
import { logout, setToken } from "../features/auth/store/authReducer";
import { RefreshResponse } from "../features/auth/types";
import { toggleLoader } from "../store/reducers/loaderReducer";

export type FetchError = {
  data: {
    message: string;
  };
  status: number | string;
};

type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchError>;

const composeInterseptors = (
  baseQuery: BaseQuery,
  interceptors: ((query: BaseQuery) => BaseQuery)[]
) => {
  return interceptors.reduce((prev, curr) => curr(prev), baseQuery);
};

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

const baseQueryWithErrorInterceptor =
  (baseQuery: BaseQuery): BaseQuery =>
  async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status !== 401) {
      toast.error(`${result.error.data.message}`);
    }
    return result;
  };

const baseQueryWithReauthInterceptor =
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

const baseQueryWithLoadingInterceptor =
  (baseQuery: BaseQuery): BaseQuery =>
  async (args, api, extraOptions) => {
    api.dispatch(toggleLoader(true));

    const result = await baseQuery(args, api, extraOptions);

    api.dispatch(toggleLoader(false));

    return result;
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: composeInterseptors(baseQuery, [
    baseQueryWithErrorInterceptor,
    baseQueryWithReauthInterceptor,
    baseQueryWithLoadingInterceptor,
  ]),
  tagTypes: ["Settings"],
  endpoints: () => ({}),
});
