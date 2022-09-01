import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../../services/store";
import { selectQuizQueryResult, selectUserGameQueryResult } from "./slice";
import { Question } from "./types";
import {
  selectTopicsSearchParams,
  selectUserGameSearchParams,
} from "../../../services/router/selectors";

export const selectQuizTopics = createSelector(
  (state: RootState) => state.quiz.topics,
  (topics) => topics
);

export const selectQuizAnswers = createSelector(
  (state: RootState) => state.quiz.answers,
  (answers) => answers
);

export const selectQuizData = createSelector(
  (state: RootState) => state.quiz,
  (quiz) => quiz
);

export const selectCurrentIndex = createSelector(
  (state: RootState) => state.quiz.currentIndex,
  (index) => index
);

type Selector<S> = (state: RootState) => S;

export const selectQuizScore = (
  questions: Question[] | undefined
): Selector<number> =>
  createSelector(selectQuizAnswers, (answers) => {
    let totalScore = 0;
    for (let id in answers) {
      const question = questions?.find((q) => q.id === id);
      if (question) {
        if (answers[id] === question.correctAnswer) {
          totalScore++;
        }
      }
    }

    return totalScore;
  });

export const selectQuiz = (state: RootState) => {
  const topics = selectTopicsSearchParams(state);
  if (topics) {
    return selectQuizQueryResult(topics)(state).data;
  }
};

export const selectUserGameFromQuery = (state: RootState) => {
  const { userId, gameId } = selectUserGameSearchParams(state) ?? {};
  if (userId && gameId) {
    return selectUserGameQueryResult({ userId, gameId })(state).data;
  }
};

export const selectUserGameQuiz = createSelector(
  selectUserGameFromQuery,
  (game) => game?.quiz
);

export const selectCurrentQuestion = createSelector(
  selectUserGameSearchParams,
  selectCurrentIndex,
  selectQuiz,
  selectUserGameQuiz,
  (params, index, quiz, gameQuiz) =>
    params ? gameQuiz?.[index] : quiz?.[index]
);
