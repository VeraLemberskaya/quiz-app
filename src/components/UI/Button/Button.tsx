import React, { FC } from "react";

import styles from "./button.module.scss";
import { ButtonType, ButtonSize } from "./types";

const BUTTON_TYPES: { [key in ButtonType]: string } = {
  primary: styles.primary,
  outlined: styles.outlined,
  disabled: styles.disabled,
};

const BUTTON_SIZES: { [key in ButtonSize]: string } = {
  large: styles.large,
};

type Props = {
  type?: ButtonType;
  buttonSize?: ButtonSize;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
} & React.HTMLProps<HTMLButtonElement>;

const Button: FC<Props> = ({
  type,
  buttonSize,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${type ? BUTTON_TYPES[type] : ""} ${
        buttonSize ? BUTTON_SIZES[buttonSize] : ""
      }`}
      {...props}
    >
      {startIcon ? <span className={styles.startIcon}>{startIcon}</span> : null}
      {props.children}
      {endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
    </button>
  );
};

export default Button;
