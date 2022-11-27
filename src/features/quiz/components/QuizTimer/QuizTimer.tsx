import { FC } from "react";

import classNames from "classnames";

import { useAppSelector } from "../../../../store/hooks";
import { selectQuestionTime } from "../../../settings/services/selectors";
import Alarm from "../../../../assets/images/alarm.svg";
import { useQuizTimer } from "../../hooks/useQuizTimer";

import styles from "./quizTimer.module.scss";
import { useQuiz } from "../../hooks/useQuiz";

//useNavigateButtons и useQuizTimer следят за изменениями isAnswered

type Props = {
  onExpire: () => void;
};

const QuizTimer: FC<Props> = ({ onExpire }) => {
  const questionTime = useAppSelector(selectQuestionTime);

  const { seconds } = useQuizTimer({ expiryTime: questionTime, onExpire });

  const { isResultsMode } = useQuiz();

  if (isResultsMode) {
    return null;
  }

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
