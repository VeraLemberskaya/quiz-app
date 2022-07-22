import React, { FC } from "react";
import { Button } from "../../../UI";

import styles from "./modal.module.scss";

type Props = {
  score: number | string;
  onComplete: () => void;
  onCheckResult: () => void;
};

const Modal: FC<Props> = ({ score, onCheckResult, onComplete }) => {
  return (
    <>
      <div className={`${styles.modalBody}`}>
        <div className={styles.imageContainer}>
          <div className={styles.text}>
            <h3 className={styles.subtitle}>Your score</h3>
            <h1 className={styles.title}>{score}</h1>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button type="outlined" buttonSize="large" onClick={onCheckResult}>
            Check results
          </Button>
          <Button type="primary" buttonSize="large" onClick={onComplete}>
            Complete
          </Button>
        </div>
      </div>
      <div className={styles.overlay} />
    </>
  );
};

export default Modal;
