import React, { FC, useEffect } from "react";
import { Modal, Button } from "../../../UI";

import styles from "./quizModal.module.scss";
import axios from "../../../../axios";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectQuizData,
  selectQuizScore,
} from "../../../../redux/quiz/selectors";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../../../redux/user/selectors";
import { getFormattedDate } from "../../../../utils";

const QuizModal: FC = () => {
  const { currentQuiz, answers } = useAppSelector(selectQuizData);
  const totalScore = useAppSelector(selectQuizScore);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const game = {
      date: getFormattedDate(new Date()),
      quiz: currentQuiz,
      answers,
      score: totalScore,
    };
    if (user) {
      axios.post("users/set-game-result", {
        id: user.id,
        game,
      });
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
