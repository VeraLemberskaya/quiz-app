import React from "react";

import styles from "./quiz.module.scss";
import Question from "./Question";
import Answer from "./Answer";

const question = {
  title: "Some question title? Some question title?",
  answers: ["answer1", "answer2 answer2.0", "answer3", "answer4"],
};

const Quiz: React.FC = () => {
  return (
    <>
      <Question>{question.title}</Question>
      <div className="container">
        <div className={`${styles.answersContainer} row`}>
          {question.answers.map((answer, index) => (
            <Answer key={JSON.stringify(answer)} index={index}>
              {answer}
            </Answer>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quiz;
