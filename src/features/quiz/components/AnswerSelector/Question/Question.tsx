import classNames from "classnames";
import React from "react";

import styles from "./question.module.scss";

type QuestionProps = {
  img?: string;
  children: React.ReactNode;
};

const Question: React.FC<QuestionProps> = ({ children, img }) => {
  return (
    <div
      className={classNames(styles.questionContainer, {
        [styles.small]: img,
      })}
    >
      {img && (
        <div className={styles.imgContainer}>
          <img src={img} alt="flag" />
        </div>
      )}
      <p className={styles.questionTitle}>{children}</p>
    </div>
  );
};

export default Question;
