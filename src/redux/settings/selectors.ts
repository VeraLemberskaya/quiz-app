import { createSelector } from "@reduxjs/toolkit";
import { selectSettingsResult } from "./slice";
import { AmountValue, Settings, SettingsValues, Topic } from "./types";

const getSelectedTopics = (topics: Topic[]) =>
  topics.filter((topic) => topic.selected).map((topic) => topic.name);

const getSelectedQuestionAmount = (questionAmountValues: AmountValue[]) =>
  questionAmountValues.find((value) => value.selected)?.value ?? 0;

const getSelectedAnswerAmount = (answerAmountValues: AmountValue[]) =>
  answerAmountValues.find((value) => value.selected)?.value ?? 0;

const emptySettings: Settings = {
  topics: [],
  questionAmountValues: [],
  answerAmountValues: [],
  questionTime: 0,
};

export const selectAllSettings = createSelector(
  selectSettingsResult,
  (settings) => settings?.data ?? emptySettings
);

export const selectCurrentSettings = createSelector(
  selectAllSettings,
  (settings) =>
    ({
      topics: getSelectedTopics(settings.topics),
      questionAmount: getSelectedQuestionAmount(settings.questionAmountValues),
      answerAmount: getSelectedAnswerAmount(settings.answerAmountValues),
      questionTime: settings.questionTime,
    } as SettingsValues)
);
