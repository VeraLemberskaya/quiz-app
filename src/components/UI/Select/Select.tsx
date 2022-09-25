import { FC, useEffect, useState } from "react";
import Dropdown from "../Dropdown";

import styles from "./select.module.scss";

type Props = {
  label: string;
  defaultValue?: string | number;
  options: string[] | number[];
  onSelect: (value: string | number) => void;
};

const Select: FC<Props> = ({ label, defaultValue, options, onSelect }) => {
  const [value, setValue] = useState<string | number | undefined>(defaultValue);

  useEffect(() => {
    if (value) {
      onSelect(value);
    }
  }, [value]);

  return (
    <div className={styles.selectWrapper}>
      <p className={styles.label}>{label}</p>
      <Dropdown>
        <Dropdown.Toggle>{value}</Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item key={option} onClick={() => setValue(option)}>
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Select;
