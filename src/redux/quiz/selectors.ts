import { RootState } from "../store";

export const selectCurrentQuestion = (state: RootState) =>
  state.quiz.currentQuiz[state.quiz.currentIndex];

export const selectQuizStatus = (state: RootState) => state.quiz.status;

export const selectQuizData = (state: RootState) => state.quiz;
