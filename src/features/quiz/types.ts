export type Answer = {
  id: string;
  value: string;
};

export type Question = {
  question: {
    id: string;
    title: string;
    img: string;
    answers: Answer[];
    correctAnswer: string;
  };
  userAnswer: string | null;
};

export type Quiz = {
  id: string;
  score: number;
  questions: Question[];
};

export type QuizState = {
  topicId: string;
  quiz: Quiz;
  index: number;
  answeredQuestions: string[];
  isResultMode: boolean;
};

export type GetQuizScoreResponse = {
  score: number;
};

export type SetAnswerRequest = {
  answerId: string;
};

export type GetSavedQuizResponse = {
  quiz: Quiz | null;
  questionIndex: number;
};
