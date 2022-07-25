import React, { FC } from "react";

import styles from "./step.module.scss";

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  hasConnector: boolean;
};

const Step: FC<Props> = ({ isActive, children, hasConnector }) => {
  return (
    <div className={`${styles.stepBody} ${isActive ? styles.active : ""}`}>
      {hasConnector && (
        <div className={styles.stepConnectorContainer}>
          <span className={styles.stepConnector} />
        </div>
      )}
      <div className={styles.stepLabelContainer}>
        <div className={styles.stepLabel}>{children}</div>
      </div>
    </div>
  );
};

export default Step;
