import React from "react";

import styles from "./question.module.scss";

type QuestionProps = {
  children: React.ReactNode;
};

const Question: React.FC<QuestionProps> = ({ children }) => {
  return (
    <div className={styles.questionContainer}>
      <p className={styles.questionTitle}>{children}</p>
    </div>
  );
};

export default Question;
