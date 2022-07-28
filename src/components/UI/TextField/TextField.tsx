import React, {
  FC,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import styles from "./textField.module.scss";

type Props = Omit<React.HTMLProps<HTMLInputElement>, "type" | "checked"> & {
  type?: "password" | "text";
  error?: string;
  errorIcon?: JSX.Element;
};

const TextField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder, type = "text", error, errorIcon, ...otherProps } = props;

  useEffect(() => {
    if (inputRef.current === document.activeElement) {
      setInputFocused(true);
    }
  }, [document.activeElement]);

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => inputRef.current
  );

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
    <div className={styles.textFieldWrapper}>
      <span
        className={`${styles.inputWrapper} ${
          inputFocused ? styles.focused : ""
        } ${inputRef.current?.value ? styles.filled : ""} ${
          error ? styles.invalid : ""
        }`}
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
      <span className={`${styles.error} ${error ? styles.visible : ""}`}>
        {errorIcon && errorIcon}
        {error}
      </span>
    </div>
  );
});

export default TextField;
