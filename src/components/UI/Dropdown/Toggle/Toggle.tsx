import classNames from "classnames";
import React, { FC } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import { useDropdownContext } from "../context";
import styles from "../dropdown.module.scss";

type Props = {
  children: React.ReactNode;
};

const Toggle: FC<Props> = ({ children }) => {
  const { isOpened, toggleOpened } = useDropdownContext();

  return (
    <div
      className={classNames(styles.dropdownToggle, isOpened && styles.opened)}
      onClick={() => toggleOpened()}
    >
      {children}
      <span className={styles.icon}>
        <AiFillCaretDown />
      </span>
    </div>
  );
};

export default Toggle;
