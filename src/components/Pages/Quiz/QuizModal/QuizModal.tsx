import { FC, useEffect } from "react";

import styles from "./quizModal.module.scss";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectQuizData,
  selectQuizScore,
} from "../../../../redux/quiz/selectors";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../../../redux/user/selectors";
import { getFormattedDate } from "../../../../utils";
import { saveUserGame } from "../../../../api/requests";
import { Game } from "../../../../redux/quiz/types";
import Button from "../../../UI/Button";
import Modal from "../../../UI/Modal";

const QuizModal: FC = () => {
  const { currentQuiz, answers } = useAppSelector(selectQuizData);
  const totalScore = useAppSelector(selectQuizScore);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const game: Omit<Game, "id"> = {
      date: getFormattedDate(new Date()),
      quiz: currentQuiz,
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
