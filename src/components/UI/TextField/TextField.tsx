import React, { FC, useRef, useState } from "react";

import styles from "./textField.module.scss";

type Props = Omit<React.HTMLProps<HTMLInputElement>, "type" | "checked"> & {
  type?: "password" | "text";
};

const TextField: FC<Props> = (props) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder, type = "text", ...otherProps } = props;

  const handleTextFieldClick = () => {
    setInputFocused(true);
    inputRef.current?.focus();
  };

  const handleTextFieldBlur: React.FocusEventHandler<HTMLInputElement> = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (otherProps.onBlur) {
      otherProps.onBlur(event);
    }
    setInputFocused(false);
  };

  return (
    <span
      className={`${styles.inputWrapper} ${
        inputFocused ? styles.focused : ""
      } ${inputRef.current?.value ? styles.filled : ""}`}
      onClick={handleTextFieldClick}
    >
      <label className={styles.label}>{placeholder}</label>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type={type}
          className={styles.input}
          {...otherProps}
          onBlur={handleTextFieldBlur}
        />
      </div>
    </span>
  );
};

export default TextField;
