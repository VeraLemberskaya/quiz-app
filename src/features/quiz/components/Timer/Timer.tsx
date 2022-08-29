import React, { Ref, useImperativeHandle } from "react";

import styles from "./timer.module.scss";
import Alarm from "../../../../assets/images/alarm.svg";
import classNames from "classnames";
import { useTimer } from "react-timer-hook";
import { getExpiryTimestamp } from "../../../../utils/getExpiryTimestamp";

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
  const { seconds, pause, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp(expiryTime),
    onExpire,
  });

  useImperativeHandle(ref, () => ({
    restart: () => {
      restart(getExpiryTimestamp(expiryTime));
    },
    stop: pause,
  }));

  return (
    <div
      className={classNames(styles.timerWrapper, {
        [styles.expired]: seconds <= 0,
      })}
    >
      <img className={styles.timerImage} src={Alarm} alt="Timer" />
      <span className={styles.label}>{seconds}</span>
    </div>
  );
};

export default React.forwardRef(Timer);
