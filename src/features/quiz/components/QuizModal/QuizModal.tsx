import { FC, useEffect } from "react";

import styles from "./quizModal.module.scss";
import { useAppSelector } from "../../../../services/hooks";
import {
  selectQuizData,
  selectQuizScore,
  selectQuizTopics,
} from "../../services/selectors";
import { useNavigate } from "react-router-dom";
import { saveUserGame } from "../../../../api/requests";

import { getFormattedDate } from "../../../../utils/getFormattedDate";
import { selectCurrentUser } from "../../../../features/user/services/selectors";
import Button from "../../../../components/UI/Button";
import Modal from "../../../../components/UI/Modal";
import { useGetQuizQuery } from "../../services/slice";
import { Game, Question } from "../../services/types";

const QuizModal: FC = () => {
  const { data: currentQuiz } = useGetQuizQuery(
    useAppSelector(selectQuizTopics)
  );
  const { answers, time } = useAppSelector(selectQuizData);
  const totalScore = useAppSelector(selectQuizScore(currentQuiz));
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const game: Omit<Game, "id"> = {
      date: getFormattedDate(new Date()),
      quiz: currentQuiz as Question[],
      answers,
      score: totalScore,
      time,
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
          onClick={() => {
            navigate("/results", {
              state: {
                isResultPage: true,
              },
            });
          }}
        >
          Check results
        </Button>
        <Button
          buttonType="primary"
          buttonSize="large"
          onClick={() => {
            navigate("/");
          }}
        >
          Complete
        </Button>
      </div>
    </Modal>
  );
};

export default QuizModal;
