import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { apiSlice } from "../../api/apiSlice";

import { Topic } from "./types";

const topicsAdapter = createEntityAdapter<Topic>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = topicsAdapter.getInitialState();

export const topicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query<EntityState<Topic>, void>({
      query: () => "/topics",
      transformResponse: (data: Topic[]) => {
        return topicsAdapter.setAll(initialState, data);
      },
    }),
  }),
});

export { topicsAdapter };

export const { useGetTopicsQuery } = topicApiSlice;
