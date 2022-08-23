import { FC } from "react";

import styles from "./loseModal.module.scss";
import Modal from "../../../UI/Modal";
import Button from "../../../UI/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  onStartAgain: () => void;
};

const LoseModal: FC<Props> = ({ onStartAgain }) => {
  const navigate = useNavigate();

  return (
    <Modal>
      <div className={styles.imageContainer} />
      <div className={styles.btnContainer}>
        <Button
          buttonSize="large"
          className={styles.backBtn}
          onClick={() => navigate("/")}
        >
          Go to menu
        </Button>
        <h4 className={styles.text}>Time is over</h4>
        <Button
          buttonSize="large"
          buttonType="primary"
          className={styles.button}
          onClick={onStartAgain}
        >
          Start again
        </Button>
      </div>
    </Modal>
  );
};

export default LoseModal;
