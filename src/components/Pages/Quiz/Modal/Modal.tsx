import React, { FC } from "react";
import { Button } from "../../../UI";

import styles from "./modal.module.scss";

type Props = {
  score: number | string;
  onComplete: () => void;
};

const Modal: FC<Props> = ({ score, onComplete }) => {
  return (
    <>
      <div className={`${styles.modalBody}`}>
        <div className={styles.imageContainer}>
          <div className={styles.text}>
            <h3 className={styles.subtitle}>Your score</h3>
            <h1 className={styles.title}>{score}</h1>
          </div>
        </div>
        <Button
          className={styles.btnComplete}
          type="primary"
          buttonSize="large"
          onClick={onComplete}
        >
          Complete
        </Button>
      </div>
      <div className={styles.overlay} />
    </>
  );
};

export default Modal;
