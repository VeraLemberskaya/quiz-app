import React from "react";

import styles from "./answer.module.scss";

type Props = {
  selected?: boolean;
  questionId: number;
  index: number;
  onSelect: (data: { questionId: number; answer: number }) => void;
  children?: React.ReactNode;
};

const letterACode: number = 65;

const Answer: React.FC<Props> = ({
  selected,
  index,
  children,
  onSelect,
  questionId,
}) => {
  return (
    <div
      className={`${styles.answerContainer} ${
        selected ? styles.selected : ""
      } col`}
      onClick={() => onSelect({ questionId, answer: index })}
    >
      <div className={styles.answerIndex}>
        {String.fromCharCode(letterACode + index)}.
      </div>
      <p className={styles.answer}>{children}</p>
    </div>
  );
};

export default Answer;
