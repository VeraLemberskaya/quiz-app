import React from "react";

import styles from "./answer.module.scss";

type AnswerProps = {
  index: number;
  children?: React.ReactNode;
};

const letterACode: number = 65;

const Answer: React.FC<AnswerProps> = ({ index, children }) => {
  return (
    <div className={`${styles.answerContainer} col`}>
      <div className={styles.answerIndex}>
        {String.fromCharCode(letterACode + index)}.
      </div>
      <p className={styles.answer}>{children}</p>
    </div>
  );
};

export default Answer;
