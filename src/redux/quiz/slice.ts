import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getQuiz } from "../../api/requests";
import { Question, QuizSliceState } from "./types";

export const initQuiz = createAsyncThunk<Question[]>(
  "quiz/initQuiz",
  async () => {
    return await getQuiz();
  }
);

const initialState: QuizSliceState = {
  status: "loading",
  currentQuiz: [],
  currentIndex: 0,
  answers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCurrentQuiz: {
      reducer(
        state,
        action: PayloadAction<{
          quiz: Question[];
          answers: Record<string, number>;
        }>
      ) {
        const { quiz, answers } = action.payload;
        state.currentQuiz = quiz;
        state.answers = answers;
        state.status = "success";
        state.currentIndex = 0;
      },
      prepare(quiz: Question[], answers: Record<string, number>) {
        return { payload: { quiz, answers } };
      },
    },
    increment: (state) => {
      state.currentIndex++;
    },
    decrement: (state) => {
      if (state.currentIndex !== 0) {
        state.currentIndex--;
      }
    },
    setQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    resetCurrentQuestion: (state) => {
      state.currentIndex = 0;
    },
    resetQuiz: () => {
      return initialState;
    },
    setAnswer: {
      reducer(state, action: PayloadAction<{ id: string; answer: number }>) {
        const { id, answer } = action.payload;
        state.answers = {
          ...state.answers,
          [id]: answer,
        };
      },
      prepare(id: string, answer: number) {
        return { payload: { id, answer } };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initQuiz.pending, (state) => {
      state = initialState;
    });
    builder.addCase(initQuiz.fulfilled, (state, action) => {
      state.status = "success";
      state.currentQuiz = action.payload;
    });
    builder.addCase(initQuiz.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const {
  setCurrentQuiz,
  increment,
  decrement,
  setQuestionIndex,
  setAnswer,
  resetQuiz,
  resetCurrentQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
