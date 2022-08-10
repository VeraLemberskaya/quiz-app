import { RootState } from "../store";

export const selectCurrentSettings = (state: RootState) => state.settings;
export const selectSelectedTopics = (state: RootState) => {
  return state.settings.topics.filter((topic) => topic.selected);
};
export const selectSelectedQuestionAmount = (state: RootState) => {
  const questionAmountValues = state.settings.questionAmountValues;
  return questionAmountValues.find((value) => value.selected)?.value ?? 0;
};

export const selectSelectedAnswerAmount = (state: RootState) => {
  const answerAmountValues = state.settings.answerAmountValues;
  return answerAmountValues.find((value) => value.selected)?.value ?? 0;
};
