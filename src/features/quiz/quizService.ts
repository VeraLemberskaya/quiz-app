import { apiSlice } from "../../api/apiSlice";

import { GetQuizResponse, SetAnswerRequest } from "./types";

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query<GetQuizResponse, string>({
      query: (topicId) => ({
        url: "/quiz",
        method: "POST",
        body: {
          topicId,
        },
      }),
    }),
    getQuizById: builder.query<GetQuizResponse, string>({
      query: (id) => `/quiz/${id}`,
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

export const { useGetQuizQuery, useGetQuizByIdQuery, useSetAnswerMutation } =
  quizApiSlice;
