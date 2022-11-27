import React, { FC, useCallback, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

import Portal from "../../Portal";

import styles from "./modal.module.scss";

type Props = {
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ title, children, onClose }) => {
  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (onClose) {
          onClose();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyUp]);

  return (
    <Portal>
      <div className={styles.modalBody}>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}
        {onClose && (
          <MdOutlineClose className={styles.closeBtn} onClick={onClose} />
        )}
        {children}
      </div>
      <div className={styles.overlay} onClick={onClose} />
    </Portal>
  );
};

export default Modal;
