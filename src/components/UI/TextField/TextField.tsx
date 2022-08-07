import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import styles from "./textField.module.scss";

type Props = Omit<React.HTMLProps<HTMLInputElement>, "type" | "checked"> & {
  type?: "password" | "text";
  error?: string;
  errorIcon?: JSX.Element;
  focused?: boolean;
};

const TextField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    placeholder,
    value,
    type = "text",
    error,
    errorIcon,
    focused = false,
    ...otherProps
  } = props;
  const [inputValue, setInputValue] = useState(value ?? "");
  const [inputFocused, setInputFocused] = useState<boolean>(focused);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current === document.activeElement) {
      setInputFocused(true);
    }
  }, [document.activeElement]);

  useEffect(() => {
    if (focused) {
      setInputFocused(true);
      inputRef.current?.focus();
    }
  }, [focused]);

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => inputRef.current
  );

  const handleTextFieldClick = () => {
    setInputFocused(true);
    inputRef.current?.focus();
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (props.onChange) {
      props.onChange(event);
    }
    setInputValue(event.target.value);
  };

  const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (props.onBlur) {
      props.onBlur(event);
    }
    setInputFocused(false);
  };

  const handleEyeIconClick = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.textFieldWrapper}>
      <span
        className={`${styles.inputWrapper} ${
          inputFocused ? styles.focused : ""
        } ${props.value || inputRef.current?.value ? styles.filled : ""} ${
          error ? styles.invalid : ""
        } ${props.disabled ? styles.disabled : ""}`}
        onClick={handleTextFieldClick}
      >
        <label className={styles.label}>{placeholder}</label>
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            value={inputValue}
            type={type === "text" ? type : passwordVisible ? "text" : type}
            className={styles.input}
            {...otherProps}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>
        {type === "password" && (
          <span onClick={handleEyeIconClick} className={styles.eyeIcon}>
            {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        )}
      </span>
      <span className={`${styles.error} ${error ? styles.visible : ""}`}>
        {errorIcon && errorIcon}
        {error}
      </span>
    </div>
  );
});

export default TextField;
