import React from "react";
import style from "./button.module.css";

const BUTTON_TYPES = {
  primary: style.Primary,
  outlined: style.Outlined,
};

const BUTTON_SIZES = {
  large: style.Large,
};

const Button = (props) => {
  const { type, size, startIcon, endIcon, ...otherProps } = props;

  const btnTypeClass = BUTTON_TYPES[type] ?? "";
  const btnSizeClass = BUTTON_SIZES[size] ?? "";

  return (
    <button
      className={`${style.Button} ${btnTypeClass} ${btnSizeClass}`}
      {...otherProps}
    >
      {startIcon ? <span className={style.StartIcon}>{startIcon}</span> : null}
      {props.children}
      {endIcon ? <span className={style.EndIcon}>{endIcon}</span> : null}
    </button>
  );
};

export default Button;
