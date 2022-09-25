export type Status = "loading" | "success" | "error";

export type Question = {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  img?: string;
};

export interface QuizSliceState {
  topics: string[];
  currentIndex: number;
  answers: Record<string, number>;
}

export type Game = {
  date: string;
  quiz: Question[];
  answers: Record<string, number>;
  score: number;
  id: string;
};
