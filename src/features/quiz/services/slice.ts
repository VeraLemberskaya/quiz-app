import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../../../services/apiSlice";

import { Game, Question, QuizSliceState } from "./types";

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query<Question[], string[]>({
      query: (topics) => ({
        url: "/quiz",
        params: { topics },
      }),
    }),
    getUserGame: builder.query<Game, { userId: string; gameId: string }>({
      query: ({ userId, gameId }) => `/users/${userId}/games/${gameId}`,
    }),
  }),
});

const initialState: QuizSliceState = {
  topics: [],
  currentIndex: 0,
  answers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setTopics: (state, action: PayloadAction<string[]>) => {
      state.topics = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topics.push(action.payload);
    },
    removeTopic: (state, action: PayloadAction<string>) => {
      state.topics = state.topics.filter((topic) => topic != action.payload);
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
    setAnswer: {
      reducer(
        state,
        action: PayloadAction<{
          id: string;
          answer: number;
        }>
      ) {
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
    builder.addMatcher(
      quizApiSlice.endpoints.getQuiz.matchFulfilled,
      (state) => {
        state.currentIndex = 0;
        state.answers = {};
      }
    );
    builder.addMatcher(
      quizApiSlice.endpoints.getUserGame.matchFulfilled,
      (state, { payload }) => {
        state.currentIndex = 0;
        state.answers = payload.answers;
      }
    );
  },
});

export const {
  setTopics,
  setTopic,
  removeTopic,
  increment,
  decrement,
  setQuestionIndex,
  setAnswer,
  resetCurrentQuestion,
} = quizSlice.actions;

export const { useGetQuizQuery, useGetUserGameQuery } = quizApiSlice;

export const selectQuizQueryResult = quizApiSlice.endpoints.getQuiz.select;

export const selectUserGameQueryResult =
  quizApiSlice.endpoints.getUserGame.select;

export default quizSlice.reducer;
