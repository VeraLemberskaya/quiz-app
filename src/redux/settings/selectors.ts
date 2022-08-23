import { RootState } from "../store";
import { AmountValue, Topic } from "./types";

const getSelectedTopics = (topics: Topic[]) =>
  topics.filter((topic) => topic.selected);

const getSelectedQuestionAmount = (questionAmountValues: AmountValue[]) =>
  questionAmountValues.find((value) => value.selected)?.value ?? 0;

const getSelectedAnswerAmount = (answerAmountValues: AmountValue[]) =>
  answerAmountValues.find((value) => value.selected)?.value ?? 0;

export const selectSettingsValues = (state: RootState) => state.settings;

export const selectCurrentSettings = (state: RootState) => ({
  topics: getSelectedTopics(state.settings.topics),
  questionAmount: getSelectedQuestionAmount(
    state.settings.questionAmountValues
  ),
  answerAmount: getSelectedAnswerAmount(state.settings.answerAmountValues),
});
