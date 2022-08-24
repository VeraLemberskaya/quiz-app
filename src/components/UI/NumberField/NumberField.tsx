import { useState, useRef, Ref, useImperativeHandle } from "react";
import classNames from "classnames";

import styles from "./numberField.module.scss";
import { useControlledInput, useOutsideClickEffect } from "../../../hooks";
import React from "react";
import ErrorDisplay from "../ErrorDisplay";

type Props = {
  value?: number;
  step: number;
  error?: string;
  errorIcon?: JSX.Element;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "checked">;

const NumberField = (
  { value, step, error, errorIcon, onChange, ...otherProps }: Props,
  ref: Ref<HTMLInputElement | null>
) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [inputValue, handleInputChange] = useControlledInput(value, onChange);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current, [inputRef.current]);

  useOutsideClickEffect(() => {
    setInputFocused(false);
  }, []);

  const handleNumberFieldClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.stopPropagation();
    setInputFocused(true);
    inputRef.current?.focus();
  };

  return (
    <>
      <div
        className={classNames(styles.numberFieldWrapper, {
          [styles.focused]: inputFocused,
          [styles.invalid]: error,
        })}
        onClick={handleNumberFieldClick}
      >
        <input
          type="number"
          value={inputValue}
          ref={inputRef}
          className={styles.input}
          onChange={handleInputChange}
          {...otherProps}
        />
      </div>
      <div className="position-absolute">
        <ErrorDisplay
          message={error ?? ""}
          icon={errorIcon}
          visible={!!error}
        />
      </div>
    </>
  );
};

export default React.forwardRef(NumberField);
