import React from "react";
import styles from "./button.module.scss";

const BUTTON_TYPES = {
  primary: styles.primary,
  outlined: styles.outlined,
};

const BUTTON_SIZES = {
  large: styles.large,
};

const Button = (props) => {
  const { type, size, startIcon, endIcon, ...otherProps } = props;

  const btnTypeClass = BUTTON_TYPES[type] ?? "";
  const btnSizeClass = BUTTON_SIZES[size] ?? "";

  return (
    <button
      className={`${styles.button} ${btnTypeClass} ${btnSizeClass}`}
      {...otherProps}
    >
      {startIcon ? <span className={styles.startIcon}>{startIcon}</span> : null}
      {props.children}
      {endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
    </button>
  );
};

export default Button;
