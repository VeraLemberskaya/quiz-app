import React, { FC } from "react";
import { Modal, Button } from "../../../UI";

import styles from "./quizModal.module.scss";
import { useAppSelector } from "../../../../redux/hooks";
import { selectQuizScore } from "../../../../redux/quiz/selectors";
import { useNavigate } from "react-router-dom";

const QuizModal: FC = () => {
  const totalScore = useAppSelector(selectQuizScore);
  const navigate = useNavigate();

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
          type="outlined"
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
          type="primary"
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
