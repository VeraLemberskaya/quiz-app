import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { AmountValue, SettingSliceState, Topic } from "./types";

export const initSettings = createAsyncThunk<Omit<SettingSliceState, "status">>(
  "settings/initSettings",
  async () => {
    const { data } = await axios.get<Omit<SettingSliceState, "status">>(
      "settings"
    );
    return data;
  }
);

const initialState: SettingSliceState = {
  topics: [],
  questionAmountValues: [],
  answerAmountValues: [],
  status: "loading",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<Topic>) => {
      const topic = state.topics.find(
        (topic) => topic.name === action.payload.name
      );
      if (topic) {
        if (
          topic.selected &&
          state.topics.filter((topic) => topic.selected).length === 1
        )
          return;
        topic.selected = !topic.selected;
      }
    },
    setQuestionAmount: (state, action: PayloadAction<AmountValue>) => {
      const prevValue = state.questionAmountValues.find(
        (value) => value.selected
      );
      if (prevValue) prevValue.selected = false;
      const currValue = state.questionAmountValues.find(
        (value) => value.value === action.payload.value
      );
      if (currValue) currValue.selected = true;
    },
    setAnswerAmount: (state, action: PayloadAction<AmountValue>) => {
      const prevValue = state.answerAmountValues.find(
        (value) => value.selected
      );
      if (prevValue) prevValue.selected = false;
      const currValue = state.answerAmountValues.find(
        (value) => value.value === action.payload.value
      );
      if (currValue) currValue.selected = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initSettings.pending, (state) => {
      state = initialState;
    });
    builder.addCase(initSettings.fulfilled, (state, action) => {
      const { topics, questionAmountValues, answerAmountValues } =
        action.payload;
      state.topics = topics;
      state.questionAmountValues = questionAmountValues;
      state.answerAmountValues = answerAmountValues;
      state.status = "success";
    });
    builder.addCase(initSettings.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setTopic, setQuestionAmount, setAnswerAmount } =
  settingsSlice.actions;

export default settingsSlice.reducer;
