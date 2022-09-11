import { FC, useEffect } from "react";

import styles from "./quizModal.module.scss";
import { useAppSelector } from "../../../../services/hooks";
import {
  selectQuiz,
  selectQuizAnswers,
  selectQuizScore,
} from "../../services/selectors";
import moment from "moment";

import { selectCurrentUser } from "../../../../features/user/services/selectors";
import Button from "../../../../components/UI/Button";
import Modal from "../../../../components/UI/Modal";
import { Game, Question } from "../../services/types";
import { useQuizContext } from "../../contexts/QuizContext";
import { Link } from "react-router-dom";
import { useSaveGameResultMutation } from "../../services/slice";

const QuizModal: FC = () => {
  const [saveUserGame] = useSaveGameResultMutation();

  const quiz = useAppSelector(selectQuiz) as Question[];
  const answers = useAppSelector(selectQuizAnswers);
  const score = useAppSelector(selectQuizScore);
  const user = useAppSelector(selectCurrentUser);

  const { setResultsViewMode } = useQuizContext();

  useEffect(() => {
    const game: Omit<Game, "id"> = {
      date: moment().format("YYYY/MM/DD"),
      quiz,
      answers,
      score,
    };
    if (user) {
      saveUserGame({ id: user.id, game });
    }
  }, []);

  return (
    <Modal>
      <div className={styles.imageContainer}>
        <div className={styles.text}>
          <h3 className={styles.subtitle}>Your score</h3>
          <h1 className={styles.title}>{score}</h1>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          buttonType="outlined"
          buttonSize="large"
          onClick={() => setResultsViewMode(true)}
        >
          Check results
        </Button>
        <Link to="/">
          <Button buttonType="primary" buttonSize="large">
            Complete
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

export default QuizModal;
