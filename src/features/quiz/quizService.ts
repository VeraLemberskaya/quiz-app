import { apiSlice } from "../../api/apiSlice";

import {
  Quiz,
  GetQuizScoreResponse,
  SetAnswerRequest,
  GetSavedQuizResponse,
} from "./types";

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query<Quiz, string>({
      query: (topicId) => ({
        url: "/quiz",
        method: "POST",
        body: {
          topicId,
        },
      }),
    }),
    getSavedQuiz: builder.query<GetSavedQuizResponse, void>({
      query: () => "/quiz",
    }),
    getQuizById: builder.query<Quiz, string>({
      query: (id) => `/quiz/${id}`,
    }),
    getQuizScore: builder.query<GetQuizScoreResponse, void>({
      query: () => "/quiz/score",
    }),
    setAnswer: builder.mutation<void, SetAnswerRequest>({
      query: (body) => ({
        url: "/quiz/answer",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { endpoints } = quizApiSlice;

export const {
  useGetQuizQuery,
  useGetSavedQuizQuery,
  useGetQuizScoreQuery,
  useGetQuizByIdQuery,
  useSetAnswerMutation,
} = quizApiSlice;
