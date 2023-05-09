import { FC } from "react";

import classNames from "classnames";

import Alarm from "../../../../assets/images/alarm.svg";
import { useQuizTimer } from "../../hooks/useQuizTimer";

import { TIMER_EXPIRY_TIME } from "../../constants";

import styles from "./quizTimer.module.scss";

type Props = {
  onExpire: () => void;
};

const QuizTimer: FC<Props> = ({ onExpire }) => {
  const { seconds } = useQuizTimer({ expiryTime: TIMER_EXPIRY_TIME, onExpire });

  return (
    <div className={styles.timerContainer}>
      <div
        className={classNames(styles.timerWrapper, {
          [styles.expired]: seconds <= 0,
        })}
      >
        <img className={styles.timerImage} src={Alarm} alt="Timer" />
        <span className={styles.label}>{seconds}</span>
      </div>
    </div>
  );
};

export default QuizTimer;
