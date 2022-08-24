import { FC } from "react";
import classNames from "classnames";

import styles from "./errorDisplay.module.scss";

type Props = {
  message: string;
  icon?: JSX.Element;
  visible: boolean;
};

const ErrorDisplay: FC<Props> = ({ message, icon, visible }) => {
  return (
    <span className={classNames(styles.error, { [styles.visible]: visible })}>
      {icon && icon}
      {message}
    </span>
  );
};

export default ErrorDisplay;
