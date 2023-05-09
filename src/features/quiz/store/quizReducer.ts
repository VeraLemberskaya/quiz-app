import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Quiz, QuizState } from "../types";

const initialQuiz: Quiz = {
  id: "",
  score: 0,
  questions: [],
};

const initialState: QuizState = {
  topicId: "",
  index: 0,
  quiz: initialQuiz,
  answeredQuestions: [],
  isResultMode: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<string>) => {
      state.topicId = action.payload;
    },
    setQuestionIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    incrementQuestionIndex: (state) => {
      state.index++;
    },
    decrementQuestionIndex: (state) => {
      state.index--;
    },
    setQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quiz = action.payload;
    },
    resetIndex: (state) => {
      state.index = 0;
    },
    setAnswered: (state) => {
      const quiz = state.quiz;
      const index = state.index;
      const answeredQuestions = state.answeredQuestions;

      state.answeredQuestions = [
        ...answeredQuestions,
        quiz.questions[index].question.id,
      ];
    },
    setResultMode: (state, action: PayloadAction<boolean>) => {
      state.isResultMode = action.payload;
    },
    resetQuiz: (state) => {
      state.quiz = initialQuiz;
      state.answeredQuestions = [];
      state.index = 0;
      state.isResultMode = false;
    },
  },
});

export const {
  setTopic,
  setQuestionIndex,
  incrementQuestionIndex,
  decrementQuestionIndex,
  setQuiz,
  resetIndex,
  setAnswered,
  setResultMode,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
