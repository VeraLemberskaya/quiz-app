import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { QUESTIONS_NUMBER } from "../../constants";
import { generateRandomQuestion } from "../../utils/generateRandomQuestion";
import { Question, QuizSliceState, Country } from "./types";

export const initQuiz = createAsyncThunk<Question[]>(
  "quiz/initQuiz",
  async () => {
    const { data: countries } = await axios.get<Country[]>(
      "https://restcountries.com/v2/all"
    );

    const questions: Question[] = [];

    while (questions.length !== QUESTIONS_NUMBER) {
      const question = generateRandomQuestion(countries);
      if (!questions.some((curr) => curr.id === question.id)) {
        questions.push(question);
      }
    }

    return questions;
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
    increment: (state) => {
      if (state.currentIndex !== QUESTIONS_NUMBER) {
        state.currentIndex++;
      }
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
  increment,
  decrement,
  setQuestionIndex,
  setAnswer,
  resetQuiz,
  resetCurrentQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
