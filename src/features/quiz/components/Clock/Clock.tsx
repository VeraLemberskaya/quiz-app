import { forwardRef, Ref, useImperativeHandle } from "react";
import { useStopwatch } from "react-timer-hook";
import { getFormattedTime } from "../../../../utils/getFormattedTime";
import { Time } from "../../services/types";

import styles from "./clock.module.scss";

type Props = {
  time?: Time;
  autoStart?: boolean;
  showResult?: boolean;
};

export type ClockHandle = {
  pause: (callback?: (time: Time) => void) => void;
  start: () => void;
  reset: () => void;
  currentTime: Time;
};

const Clock = (
  { time, autoStart = true, showResult = false }: Props,
  ref: Ref<ClockHandle | null>
) => {
  const { seconds, minutes, pause, start, reset } = useStopwatch({ autoStart });

  useImperativeHandle(ref, () => ({
    start,
    pause: (callback) => {
      pause();
      if (callback) {
        callback({ seconds, minutes });
      }
    },
    currentTime: { seconds, minutes },
    reset,
  }));

  return (
    <div className={styles.clockContainer}>
      <span className={styles.minutes}>
        {showResult
          ? time && getFormattedTime(time.minutes)
          : getFormattedTime(minutes)}
      </span>
      &nbsp;:&nbsp;
      <span className={styles.seconds}>
        {showResult
          ? time && getFormattedTime(time.seconds)
          : getFormattedTime(seconds)}
      </span>
    </div>
  );
};

export default forwardRef(Clock);
