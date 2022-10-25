import classNames from "classnames";
import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useControlledInput } from "../../../hooks/useControlledInput";

import styles from "./textField.module.scss";

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked"
> & {
  type?: "password" | "text";
  error?: boolean;
  label?: string;
};

const TextField = (props: Props, ref: Ref<HTMLInputElement | null>) => {
  const {
    type = "text",
    value = "",
    placeholder,
    label,
    error,
    className,
    onChange,
    ...otherProps
  } = props;
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const inputProps = useControlledInput(value, onChange);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputType = useMemo(
    () => (type === "text" ? type : passwordVisible ? "text" : type),
    [passwordVisible, type]
  );

  useEffect(() => {
    if (inputRef.current === document.activeElement) {
      setInputFocused(true);
    }
  }, []);

  useImperativeHandle(ref, () => inputRef.current, []);

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
              className={styles.input}
              type={inputType}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              {...inputProps}
              {...otherProps}
            />
          </div>
          {type === "password" && (
            <span onClick={handleEyeIconClick} className={styles.eyeIcon}>
              {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          )}
        </span>
      </div>
    </>
  );
};

export default React.forwardRef(TextField);
