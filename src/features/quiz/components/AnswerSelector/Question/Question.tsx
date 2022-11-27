import React from "react";

import styles from "./question.module.scss";

type Props = {
  title: string;
  img?: string;
};

const Question: React.FC<Props> = ({ title, img }) => {
  return (
    <div className={styles.questionContainer}>
      {img && (
        <div className={styles.imgContainer}>
          <img src={img} alt={img} />
        </div>
      )}
      <p className={styles.questionTitle}>{title}</p>
    </div>
  );
};

export default Question;
