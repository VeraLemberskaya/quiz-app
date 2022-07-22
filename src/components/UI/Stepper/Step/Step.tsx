import React, { FC } from "react";

import styles from "./step.module.scss";

type Props = {
  children: number;
};

const Step: FC<Props> = ({ children }) => {
  return <div className={styles.stepBody}>{children}</div>;
};

export default Step;
