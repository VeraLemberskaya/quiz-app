export type Answer = {
  id: string;
  value: string;
};

export type Question = {
  id: string;
  title: string;
  img: string;
  answers: Answer[];
  correctAnswer: string;
};

export type Quiz = Question[];

export type QuizState = {
  topicId: string;
  quiz: Quiz;
  index: number;
  answeredQuestions: string[];
  isResultMode: boolean;
};

export type GetQuizResponse = {
  quiz: Quiz;
};

export type SetAnswerRequest = {
  answerId: string;
};
