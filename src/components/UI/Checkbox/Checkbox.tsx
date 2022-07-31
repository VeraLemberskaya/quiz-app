import React, { FC, useState } from "react";
import { HiCheck } from "react-icons/hi";

import styles from "./checkbox.module.scss";

type Props = Omit<React.HTMLProps<HTMLInputElement>, "type"> & {
  label?: string;
};

const Checkbox: FC<Props> = (props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { label, ...otherProps } = props;

  const handleCheckboxClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
    setChecked((prevState) => !prevState);
  };

  return (
    <div
      className={`${styles.checkboxWrapper} ${checked ? styles.checked : ""}`}
    >
      <label className={styles.label}>
        <input
          className={styles.input}
          type="checkbox"
          {...otherProps}
          onChange={handleCheckboxClick}
          checked={checked}
        />
        <span className={styles.checkbox}>
          <HiCheck />
        </span>
        {label ?? ""}
      </label>
    </div>
  );
};

export default Checkbox;
