import React, { FC } from "react";
import ReactDOM from "react-dom";
import { MdOutlineClose } from "react-icons/md";

import styles from "./modal.module.scss";

type Props = {
  onClose?: () => void;
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modalBody}>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose}>
            <MdOutlineClose />
          </button>
        )}
        {children}
      </div>
      <div className={styles.overlay} onClick={onClose} />
    </>,
    document.body
  );
};

export default Modal;
