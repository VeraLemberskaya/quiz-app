import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Question } from "./types";

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
