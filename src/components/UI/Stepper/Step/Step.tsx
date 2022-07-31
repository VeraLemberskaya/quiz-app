import React, { FC } from "react";

import styles from "./step.module.scss";

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  hasConnector: boolean;
  disabled: boolean;
  onSelect: React.MouseEventHandler<HTMLButtonElement>;
};

const Step: FC<Props> = ({
  isActive,
  children,
  hasConnector,
  onSelect,
  disabled,
}) => {
  return (
    <button
      className={`${styles.stepBody} ${isActive ? styles.active : ""}`}
      onClick={onSelect}
      disabled={disabled}
    >
      {hasConnector && (
        <div className={styles.stepConnectorContainer}>
          <span className={styles.stepConnector} />
        </div>
      )}
      <div className={styles.stepLabelContainer}>
        <div className={styles.stepLabel}>{children}</div>
      </div>
    </button>
  );
};

export default Step;
