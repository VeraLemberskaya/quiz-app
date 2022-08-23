import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getSettings, updateSettings } from "../../api/requests";
import { RootState } from "../store";
import { Settings, SettingSliceState } from "./types";

export const initSettings = createAsyncThunk<Settings>(
  "settings/initSettings",
  async () => {
    return await getSettings();
  }
);

export const saveSettings = createAsyncThunk<void, void, { state: RootState }>(
  "settings/saveSettings",
  async (_, thunkApi) => {
    const { status, ...updatedSettings } = thunkApi.getState().settings;
    await updateSettings(updatedSettings);
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
    deleteTopic: (state, action: PayloadAction<string>) => {
      const topic = state.topics.find((topic) => topic.name === action.payload);
      if (topic) {
        topic.selected = false;
      }
    },
    setTopic: (state, action: PayloadAction<string>) => {
      const topic = state.topics.find((topic) => topic.name === action.payload);
      if (topic) {
        topic.selected = true;
      }
    },
    setQuestionAmount: (state, action: PayloadAction<number>) => {
      const prevValue = state.questionAmountValues.find(
        (value) => value.selected
      );
      if (prevValue) prevValue.selected = false;
      const currValue = state.questionAmountValues.find(
        (value) => value.value === action.payload
      );
      if (currValue) currValue.selected = true;
    },
    setAnswerAmount: (state, action: PayloadAction<number>) => {
      const prevValue = state.answerAmountValues.find(
        (value) => value.selected
      );
      if (prevValue) prevValue.selected = false;
      const currValue = state.answerAmountValues.find(
        (value) => value.value === action.payload
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
    builder.addCase(saveSettings.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(saveSettings.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(saveSettings.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setTopic, setQuestionAmount, setAnswerAmount, deleteTopic } =
  settingsSlice.actions;

export default settingsSlice.reducer;
