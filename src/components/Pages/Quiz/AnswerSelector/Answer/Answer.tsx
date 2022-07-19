import React from "react";

import { useAnswerSelectorContext } from "../context";
import styles from "./answer.module.scss";

type Props = {
  index: number;
  children: React.ReactNode;
};

const letterACode: number = 65;

const Answer: React.FC<Props> = ({ index, children }) => {
  const { setAnswer, id } = useAnswerSelectorContext();

  const handleAnswerClick = () => {
    setAnswer(index);
  };

  return (
    <label
      className={`${styles.answerContainer} col`}
      htmlFor={index.toString()}
    >
      <input
        type="radio"
        name={id}
        id={index.toString()}
        onClick={handleAnswerClick}
      />
      <div className={styles.answerIndex}>
        {String.fromCharCode(letterACode + index)}.
      </div>
      <p className={styles.answer}>{children}</p>
    </label>
  );
};

export default Answer;
