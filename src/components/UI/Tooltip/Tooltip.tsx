import { FC } from "react";
import ReactTooltip, { TooltipProps } from "react-tooltip";

import styles from "./tooltip.module.scss";

const Tooltip: FC<TooltipProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <ReactTooltip className={styles.tooltip} {...rest}>
      {children}
    </ReactTooltip>
  );
};

export default Tooltip;
