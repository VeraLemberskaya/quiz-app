import React, { FC } from "react";
import classNames from "classnames";

import { useAnswerSelectorContext } from "../useAnswerSelector";

import styles from "./answer.module.scss";

type Props = {
  id: string;
  value: string;
  index: number;
};

const ANSWER_STYLES = {
  correctAnimation: styles.correctAnimation,
  correct: styles.correct,
  wrongAnimation: styles.wrongAnimation,
  wrong: styles.wrong,
};

const getAnswerStyles = (isResultMode: boolean) => {
  const correctStyle = isResultMode
    ? ANSWER_STYLES.correct
    : ANSWER_STYLES.correctAnimation;

  const wrongStyle = isResultMode
    ? ANSWER_STYLES.wrong
    : ANSWER_STYLES.wrongAnimation;

  return {
    correctStyle,
    wrongStyle,
  };
};

const getAnswerIndexLetter = (index: number) => {
  const letterACode: number = String("A").charCodeAt(0);

  return `${String.fromCharCode(letterACode + index)}.`;
};

const Answer: FC<Props> = ({ id, value, index }) => {
  const {
    answer,
    disabled,
    isAnswered,
    setAnswer,
    checkAnswer,
    completeAnswer,
  } = useAnswerSelectorContext();

  const getAnswerClass = () => {
    if (answer === id) {
      const answerStyle = getAnswerStyles(disabled);

      return checkAnswer(id)
        ? answerStyle.correctStyle
        : answerStyle.wrongStyle;
    }
  };

  const handleAnswerSelect = () => {
    setAnswer(id);
  };

  const handleAnswerAnimationEnd = () => {
    completeAnswer();
  };

  return (
    <button
      className={classNames(styles.answerContainer, getAnswerClass())}
      onClick={handleAnswerSelect}
      onAnimationEnd={handleAnswerAnimationEnd}
      disabled={disabled || isAnswered}
    >
      <div className={styles.answerIndex}>{getAnswerIndexLetter(index)}</div>
      <p className={styles.answer}>{value}</p>
    </button>
  );
};

export default React.memo(Answer);
