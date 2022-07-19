import React, { useEffect } from "react";

import { useAnswerSelectorContext } from "../context";
import styles from "./answer.module.scss";

type Props = {
  index: number;
  children: React.ReactNode;
};

type AnswerType = "disabled" | "correct" | "wrong";

const ANSWER_TYPES: { [key in AnswerType]: string } = {
  disabled: styles.disabled,
  correct: styles.correct + " " + styles.disabled,
  wrong: styles.wrong + " " + styles.disabled,
};

const letterACode: number = 65;

const Answer: React.FC<Props> = ({ index, children }) => {
  const { setAnswer, answer, correctAnswer } = useAnswerSelectorContext();

  const getAnswerClass = () => {
    if (answer !== null) {
      if (index === correctAnswer) {
        return ANSWER_TYPES["correct"];
      } else if (answer === index) {
        return ANSWER_TYPES["wrong"];
      }
      return ANSWER_TYPES["disabled"];
    }
    return "";
  };

  const handleAnswerClick = () => {
    setAnswer(index);
  };

  return (
    <button
      className={`${styles.answerContainer} ${getAnswerClass()} col`}
      onClick={handleAnswerClick}
      disabled={answer !== null}
    >
      <div className={styles.answerIndex}>
        {String.fromCharCode(letterACode + index)}.
      </div>
      <p className={styles.answer}>{children}</p>
    </button>
  );
};

export default Answer;
