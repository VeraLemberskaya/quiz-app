import { RootState } from "../store";

export const selectCurrentQuestion = (state: RootState) =>
  state.quiz.currentQuiz[state.quiz.currentIndex];

export const selectQuizStatus = (state: RootState) => state.quiz.status;

export const selectQuizData = (state: RootState) => state.quiz;

export const selectQuizScore = (state: RootState) => {
  const answers = state.quiz.answers;
  const questions = state.quiz.currentQuiz;
  let totalScore = 0;
  for (let id in answers) {
    const question = questions.find((q) => q.id === id);
    if (question) {
      if (answers[id] === question.correctAnswer) {
        totalScore++;
      }
    }
  }

  return totalScore;
};
