import classNames from "classnames";
import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useControlledInput } from "../../../hooks/useControlledInput";
import ErrorDisplay from "../ErrorDisplay";

import styles from "./textField.module.scss";

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked"
> & {
  type?: "password" | "text";
  error?: string;
  errorIcon?: JSX.Element;
  focused?: boolean;
  label?: string;
};

const TextField = (props: Props, ref: Ref<HTMLInputElement | null>) => {
  const {
    placeholder,
    defaultValue = "",
    label,
    type = "text",
    error,
    errorIcon,
    className,
    onChange,
    ...otherProps
  } = props;
  const { inputValue, handleInputChange } = useControlledInput(
    defaultValue,
    onChange
  );
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
          className={classNames(styles.inputWrapper, {
            [styles.focused]: inputFocused,
            [styles.filled]: props.value || inputRef.current?.value,
            [styles.invalid]: error,
            [styles.disabled]: props.disabled,
          })}
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
        <ErrorDisplay
          message={error ?? ""}
          icon={errorIcon}
          visible={!!error}
        />
      </div>
    </>
  );
};

export default React.forwardRef(TextField);
