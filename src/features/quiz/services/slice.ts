import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../../../services/apiSlice";

import { Game, Question, QuizSliceState, Time } from "./types";

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
  time: { seconds: 0, minutes: 0 },
  topics: [],
  currentIndex: 0,
  answers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<Time>) => {
      state.time = action.payload;
    },
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
          answer: { index: number; time: Time };
        }>
      ) {
        const { id, answer } = action.payload;
        state.answers = {
          ...state.answers,
          [id]: answer,
        };
      },
      prepare(id: string, answer: { index: number; time: Time }) {
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
        state.time = { seconds: 0, minutes: 0 };
      }
    );
    builder.addMatcher(
      quizApiSlice.endpoints.getUserGame.matchFulfilled,
      (state, { payload }) => {
        state.currentIndex = 0;
        state.answers = payload.answers;
        state.time = payload.time;
      }
    );
  },
});

export const {
  setTime,
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

export default quizSlice.reducer;
