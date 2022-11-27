import { FC, useEffect } from "react";

import moment from "moment";

import { Link } from "react-router-dom";

import { useAppSelector } from "../../../../store/hooks";

import Button from "../../../../components/UI/Button";
import Modal from "../../../../components/UI/Modal";

import { useAuth } from "../../../../hooks/useAuth";

import styles from "./quizModal.module.scss";
import { useQuiz } from "../../hooks/useQuiz";

const QuizModal: FC = () => {
  // const [saveUserGame] = useSaveGameResultMutation();

  // const quiz = useAppSelector(selectQuiz) as Question[];
  // const answers = useAppSelector(selectQuizAnswers);
  // const score = useAppSelector(selectQuizScore);
  const { user } = useAuth();

  const { isResultsMode } = useQuiz();

  // useEffect(() => {
  //   const game: Omit<Game, "id"> = {
  //     date: moment().format("YYYY/MM/DD"),
  //     quiz,
  //     answers,
  //     score,
  //   };
  //   if (user) {
  //     saveUserGame({ id: user.id, game });
  //   }
  // }, [answers, quiz, saveUserGame, score, user]);

  return (
    <Modal>
      <div className={styles.imageContainer}>
        <div className={styles.text}>
          <h3 className={styles.subtitle}>Your score</h3>
          {/* <h1 className={styles.title}>{score}</h1> */}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          buttonType="outlined"
          buttonSize="large"
          //onClick={() => isResultsMode(true)}
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
