import React, { FC } from "react";

import styles from "./button.module.scss";
import { ButtonType, ButtonSize } from "./types";

const BUTTON_TYPES: { [key in ButtonType]: string } = {
  primary: styles.primary,
  outlined: styles.outlined,
};

const BUTTON_SIZES: { [key in ButtonSize]: string } = {
  large: styles.large,
};

type Props = {
  buttonType?: ButtonType;
  buttonSize?: ButtonSize;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({
  buttonType,
  buttonSize,
  startIcon,
  endIcon,
  ...props
}) => {
  const { className, ...otherProps } = props;
  return (
    <button
      className={`${className} ${styles.button} ${
        buttonType ? BUTTON_TYPES[buttonType] : ""
      } ${buttonSize ? BUTTON_SIZES[buttonSize] : ""}`}
      {...otherProps}
    >
      {startIcon ? <span className={styles.startIcon}>{startIcon}</span> : null}
      {props.children}
      {endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
    </button>
  );
};

export default Button;
