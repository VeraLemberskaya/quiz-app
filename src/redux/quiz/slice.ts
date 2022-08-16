import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { countriesEndPoint } from "../../constants";
import { generateRandomQuestion } from "../../utils/generateRandomQuestion";
import {
  selectSelectedAnswerAmount,
  selectSelectedQuestionAmount,
  selectSelectedTopics,
} from "../settings/selectors";
import { RootState } from "../store";
import { Question, QuizSliceState, Country } from "./types";

export const initQuiz = createAsyncThunk<
  Question[],
  void,
  { state: RootState }
>("quiz/initQuiz", async (_, thunkApi) => {
  const questionsNumber = selectSelectedQuestionAmount(thunkApi.getState());
  const answersNumber = selectSelectedAnswerAmount(thunkApi.getState());
  const selectedTopics = selectSelectedTopics(thunkApi.getState()).map(
    (topic) => topic.name
  );

  const { data: countries } = await axios.get<Country[]>(countriesEndPoint);

  const questions: Question[] = [];

  while (questions.length !== questionsNumber) {
    const question = generateRandomQuestion(
      countries,
      answersNumber,
      selectedTopics
    );
    if (!questions.some((curr) => curr.id === question.id)) {
      questions.push(question);
    }
  }

  return questions;
});

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
