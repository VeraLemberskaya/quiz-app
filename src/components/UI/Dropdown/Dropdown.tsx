import React, { useEffect, useMemo, useState } from "react";

import styles from "./dropdown.module.scss";
import { DropdownContext, DropdownContextType } from "./context";
import Item from "./Item";
import Menu from "./Menu";
import Toggle from "./Toggle";
import { useOutsideClickEffect } from "../../../hooks";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Dropdown = ({ children, className }: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  useOutsideClickEffect(() => {
    setIsOpened(false);
  }, []);

  const value: DropdownContextType = useMemo(
    () => ({
      isOpened,
      toggleOpened: () => {
        setIsOpened((prevState) => !prevState);
      },
    }),
    [isOpened]
  );

  return (
    <DropdownContext.Provider value={value}>
      <div
        className={`${className ? className : ""} ${styles.dropdownContainer}`}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;
Dropdown.Item = Item;
