import classNames from "classnames";
import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import styles from "./textField.module.scss";

type Props = Omit<React.HTMLProps<HTMLInputElement>, "type" | "checked"> & {
  type?: "password" | "text";
  error?: string;
  errorIcon?: JSX.Element;
  focused?: boolean;
};

const TextField = (props: Props, ref: Ref<HTMLInputElement | null>) => {
  const {
    placeholder,
    value,
    label,
    type = "text",
    error,
    errorIcon,
    className,
    ...otherProps
  } = props;
  const [inputValue, setInputValue] = useState(value ?? "");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current === document.activeElement) {
      setInputFocused(true);
    }
  }, [document.activeElement]);

  useImperativeHandle(ref, () => inputRef.current, [inputRef.current]);

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

  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (props.onFocus) {
      props.onFocus(event);
    }
    setInputFocused(true);
  };

  const handleEyeIconClick = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className={classNames(className, styles.textFieldWrapper)}>
        {label && <p className={styles.label}>{label}</p>}
        <span
          className={classNames(
            styles.inputWrapper,
            inputFocused && styles.focused,
            (props.value || inputRef.current?.value) && styles.filled,
            error && styles.invalid,
            props.disabled && styles.disabled
          )}
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
              onFocus={handleInputFocus}
            />
          </div>
          {type === "password" && (
            <span onClick={handleEyeIconClick} className={styles.eyeIcon}>
              {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          )}
        </span>
        <span className={classNames(styles.error, error && styles.visible)}>
          {errorIcon && errorIcon}
          {error}
        </span>
      </div>
    </>
  );
};

export default React.forwardRef(TextField);
