import React, { Ref, useState, useEffect, useImperativeHandle } from "react";

import styles from "./timer.module.scss";
import Alarm from "../../../../assets/alarm.svg";
import classNames from "classnames";

type Props = {
  expiryTime: number;
  onExpire: () => void;
};

export type TimerHandle = {
  restart: () => void;
  stop: () => void;
};

const Timer = (
  { expiryTime, onExpire }: Props,
  ref: Ref<TimerHandle | null>
) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(expiryTime);
  const [stopped, setStopped] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    restart: () => {
      setStopped(false);
      setSecondsLeft(expiryTime);
    },
    stop: () => setStopped(true),
  }));

  useEffect(() => {
    if (secondsLeft) {
      if (!stopped) {
        const interval = setInterval(() => {
          setSecondsLeft((prevState) => prevState - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    } else {
      onExpire();
    }
  });

  return (
    <div
      className={classNames(styles.timerWrapper, {
        [styles.expired]: !secondsLeft,
      })}
    >
      <img className={styles.timerImage} src={Alarm} alt="Timer" />
      <span className={styles.label}>{secondsLeft}</span>
    </div>
  );
};

export default React.forwardRef(Timer);
