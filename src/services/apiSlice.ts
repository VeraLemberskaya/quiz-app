import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

const baseURL = "http://localhost:3001";

const baseQuery = fetchBaseQuery({ baseUrl: baseURL });

const baseQueryWithErrorInterception: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.log(result, result.error);

    toast.error(`${result.error.data}`);
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorInterception,
  tagTypes: ["Settings"],
  endpoints: () => ({}),
});
