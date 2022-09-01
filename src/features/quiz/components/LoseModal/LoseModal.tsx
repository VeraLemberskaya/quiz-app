import { FC } from "react";

import styles from "./loseModal.module.scss";

import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/UI/Button";
import Modal from "../../../../components/UI/Modal";

type Props = {
  onStartAgain: () => void;
};

const LoseModal: FC<Props> = ({ onStartAgain }) => {
  return (
    <Modal>
      <div className={styles.imageContainer} />
      <div className={styles.btnContainer}>
        <Link to="/">
          <Button buttonSize="large" className={styles.backBtn}>
            Go to menu
          </Button>
        </Link>
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
