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
  const { type, size, ...otherProps } = props;

  const btnTypeClass = BUTTON_TYPES[type] ?? "";
  const btnSizeClass = BUTTON_SIZES[size] ?? "";

  return (
    <button
      className={`${style.Button} ${btnTypeClass} ${btnSizeClass}`}
      {...otherProps}
    >
      {props.children}
    </button>
  );
};

export default Button;
