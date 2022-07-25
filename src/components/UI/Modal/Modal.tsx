import React, { FC } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.scss";

type Props = {
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ children }) => {
  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modalBody}`}>{children} </div>
      <div className={styles.overlay} />
    </>,
    document.body
  );
};

export default Modal;
