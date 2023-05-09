import { FC } from "react";

import { Link, useNavigate } from "react-router-dom";

import Button from "../../../../components/UI/Button";
import Modal from "../../../../components/UI/Modal";

import { useGetQuizScoreQuery } from "../../quizService";

import { useQuiz } from "../../hooks/useQuiz";

import styles from "./quizModal.module.scss";

const QuizModal: FC = () => {
  const { quiz } = useQuiz();
  const { data, isSuccess } = useGetQuizScoreQuery();
  const navigate = useNavigate();

  const handleCheckResultsClick = () => {
    //TODO: add routes constants
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <Modal>
      <div className={styles.imageContainer}>
        <div className={styles.text}>
          <h3 className={styles.subtitle}>Your score</h3>
          <h1 className={styles.title}>{isSuccess && data.score}</h1>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          buttonType="outlined"
          buttonSize="large"
          onClick={handleCheckResultsClick}
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
