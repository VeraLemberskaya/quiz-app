import { FC, useEffect } from "react";

import styles from "./quizModal.module.scss";
import { useAppSelector } from "../../../../services/hooks";
import { selectQuizData, selectQuizScore } from "../../services/selectors";
import { saveUserGame } from "../../../../api/requests";

import { getFormattedDate } from "../../../../utils/getFormattedDate";
import { selectCurrentUser } from "../../../../features/user/services/selectors";
import Button from "../../../../components/UI/Button";
import Modal from "../../../../components/UI/Modal";
import { useGetQuizQuery } from "../../services/slice";
import { Game, Question } from "../../services/types";
import { selectTopicsSearchParams } from "../../../../services/router/selectors";
import { useQuizContext } from "../../contexts/QuizContext";
import { Link } from "react-router-dom";

const QuizModal: FC = () => {
  const { data: currentQuiz } = useGetQuizQuery(
    useAppSelector(selectTopicsSearchParams) ?? []
  );
  const { answers } = useAppSelector(selectQuizData);
  const totalScore = useAppSelector(selectQuizScore(currentQuiz));
  const user = useAppSelector(selectCurrentUser);

  const { setResultsViewMode } = useQuizContext();

  useEffect(() => {
    const game: Omit<Game, "id"> = {
      date: getFormattedDate(new Date()),
      quiz: currentQuiz as Question[],
      answers,
      score: totalScore,
    };
    if (user) {
      saveUserGame(user, game);
    }
  }, []);

  return (
    <Modal>
      <div className={styles.imageContainer}>
        <div className={styles.text}>
          <h3 className={styles.subtitle}>Your score</h3>
          <h1 className={styles.title}>{totalScore}</h1>
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
