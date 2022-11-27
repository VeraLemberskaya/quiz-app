import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

import { topicApiSlice, topicsAdapter } from "./topicService";

export const selectTopicsResult = topicApiSlice.endpoints.getTopics.select();

const selectTopicsData = createSelector(
  selectTopicsResult,
  (topicsResult) => topicsResult.data
);

export const {
  selectAll: selectAllTopics,
  selectById: selectTopicById,
  selectIds: selectTopicIds,
  selectEntities: selectTopicEntities,
} = topicsAdapter.getSelectors(
  (state: RootState) =>
    selectTopicsData(state) ?? topicsAdapter.getInitialState()
);

export const selectSelectedTopics = createSelector(selectAllTopics, (topics) =>
  topics?.filter((topic) => topic.selected)
);
