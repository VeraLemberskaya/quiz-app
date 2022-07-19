import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { QUESTIONS_NUMBER } from "../../constants";
import {
  generateRandomCapitalQuestion,
  generateRandomFlagsQuestion,
} from "../../utils/generateRandomQuestion";
import { Question, QuizSliceState, Country } from "./types";

export const initQuiz = createAsyncThunk<Question[]>(
  "quiz/initQuiz",
  async () => {
    const { data: countries } = await axios.get<Country[]>(
      "https://restcountries.com/v2/all"
    );

    const questions: Question[] = [];

    while (questions.length !== QUESTIONS_NUMBER) {
      const question = generateRandomFlagsQuestion(countries);
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
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    increment: (state) => {
      if (state.currentIndex !== state.currentQuiz.length - 1) {
        state.currentIndex++;
      }
    },
    decrement: (state) => {
      if (state.currentIndex !== 0) {
        state.currentIndex--;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initQuiz.pending, (state) => {
      state.status = "loading";
      state.currentQuiz = [];
      state.currentIndex = 0;
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

export const { increment, decrement } = quizSlice.actions;

export default quizSlice.reducer;
