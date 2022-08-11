import React, { FC } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.scss";

type Props = {
  onOverlayClick?: () => void;
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ children, onOverlayClick }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modalBody}>{children} </div>
      <div className={styles.overlay} onClick={onOverlayClick} />
    </>,
    document.body
  );
};

export default Modal;
