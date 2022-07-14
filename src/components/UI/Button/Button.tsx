import React from "react";

import styles from "./button.module.scss";
import { ButtonType, ButtonSize } from "./types";

const BUTTON_TYPES = new Map<ButtonType, string>([
  [ButtonType.PRIMARY, styles.primary],
  [ButtonType.OUTLINED, styles.outlined],
]);

const BUTTON_SIZES = new Map<ButtonSize, string>([
  [ButtonSize.LARGE, styles.large],
]);

type ButtonProps = {
  type?: ButtonType;
  buttonSize?: ButtonSize;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  type,
  buttonSize,
  startIcon,
  endIcon,
  ...props
}) => {
  let btnTypeClass = "",
    btnSizeClass = "";

  if (type) {
    btnTypeClass = BUTTON_TYPES.get(type) ?? "";
  }

  if (buttonSize) {
    btnSizeClass = BUTTON_SIZES.get(buttonSize) ?? "";
  }

  return (
    <button
      className={`${styles.button} ${btnTypeClass} ${btnSizeClass}`}
      {...props}
    >
      {startIcon ? <span className={styles.startIcon}>{startIcon}</span> : null}
      {props.children}
      {endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
    </button>
  );
};

export default Button;
