import React from "react";

import { useAnswerSelectorContext } from "../context";
import styles from "./answer.module.scss";

type Props = {
  index: number;
  children: React.ReactNode;
};

const letterACode: number = 65;

const Answer: React.FC<Props> = ({ index, children }) => {
  const { setAnswer, answer, correctAnswer, mode } = useAnswerSelectorContext();

  const getAnswerClass = () => {
    if (answer !== null) {
      if (index === correctAnswer) {
        if (mode === "review") return styles.answeredCorrect;
        return answer === index ? styles.correct : styles.correctDelay;
      } else if (answer === index) {
        return mode === "review" ? styles.answeredWrong : styles.wrong;
      }
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
      disabled={mode === "review" ? true : answer !== null}
    >
      <div className={styles.answerIndex}>
        {String.fromCharCode(letterACode + index)}.
      </div>
      <p className={styles.answer}>{children}</p>
    </button>
  );
};

export default React.memo(Answer);
