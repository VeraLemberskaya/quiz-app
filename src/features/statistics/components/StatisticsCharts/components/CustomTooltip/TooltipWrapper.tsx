import React, { FC } from "react";

import styles from "./tooltip.module.scss";

type Props = {
  children: React.ReactNode;
};

const TooltipWrapper: FC<Props> = ({ children }) => {
  return <div className={styles.customTooltip}>{children}</div>;
};

export default TooltipWrapper;
