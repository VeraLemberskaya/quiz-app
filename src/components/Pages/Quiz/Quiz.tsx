import React, { useState } from "react";

import styles from "./quiz.module.scss";
import Question from "./Question";
import Answer from "./Answer";

const questions = [
  {
    id: 1,
    title: "Some question title? Some question title?",
    answers: ["answer1", "answer2 answer2.0", "answer3", "answer4"],
    correctAnswer: 2,
  },
  {
    id: 2,
    title: "Some another question? Some question title?",
    answers: ["answer5", "answer6", "answer7", "answer8"],
    correctAnswer: 2,
  },
];

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>();

  const handleAnswerSelect = (data: { questionId: number; answer: number }) => {
    setAnswers((oldAnswers) => ({
      ...oldAnswers,
      [data.questionId]: data.answer,
    }));
  };

  return (
    <>
      {questions.map((question) => (
        <>
          <Question>{question.title}</Question>
          <div className="container">
            <div className={`${styles.answersContainer} row`}>
              {question.answers.map((answer, index) => (
                <Answer
                  questionId={question.id}
                  key={JSON.stringify(answer)}
                  index={index}
                  onSelect={handleAnswerSelect}
                  selected={answers && answers[question.id] === index}
                >
                  {answer}
                </Answer>
              ))}
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Quiz;
