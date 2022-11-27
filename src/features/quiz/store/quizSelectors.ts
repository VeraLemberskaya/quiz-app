import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../../store/store";

export const selectQuizState = (state: RootState) => state.quiz;

export const selectTopic = createSelector(
  selectQuizState,
  (quizState) => quizState.topicId
);

export const selectIndex = createSelector(
  selectQuizState,
  (quizState) => quizState.index
);

export const selectQuiz = createSelector(
  selectQuizState,
  (quizState) => quizState.quiz
);

export const selectIsResultsMode = createSelector(
  selectQuizState,
  (quizState) => quizState.isResultMode
);

export const selectCurrentQuestion = createSelector(
  selectQuiz,
  selectIndex,
  (quiz, index) => quiz[index]
);

export const selectAnsweredQuestionIds = createSelector(
  selectQuizState,
  (quizState) => quizState.answeredQuestions
);
