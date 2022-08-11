import classNames from "classnames";
import React, { Ref, useState } from "react";
import { HiCheck } from "react-icons/hi";

import styles from "./checkbox.module.scss";

type Props = Omit<React.HTMLProps<HTMLInputElement>, "type"> & {
  label?: string;
};

const Checkbox = (props: Props, ref: Ref<HTMLInputElement>) => {
  const [checked, setChecked] = useState<boolean>(props.checked ?? false);
  const { label, ...otherProps } = props;

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
    setChecked((prevState) => !prevState);
  };

  return (
    <div
      className={classNames(styles.checkboxWrapper, {
        [styles.checked]: checked,
      })}
    >
      <label className={styles.label}>
        <input
          ref={ref}
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

export default React.forwardRef(Checkbox);
