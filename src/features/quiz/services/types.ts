export type Status = "loading" | "success" | "error";

export type Time = {
  seconds: number;
  minutes: number;
};

export type Question = {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  img?: string;
};

export interface QuizSliceState {
  time: Time;
  topics: string[];
  currentIndex: number;
  answers: Record<string, { index: number; time: Time }>;
}

export type Game = {
  time: Time;
  date: string;
  quiz: Question[];
  answers: Record<string, { index: number; time: Time }>;
  score: number;
  id: string;
};
