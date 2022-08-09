import React, { FC } from "react";
import { useDropdownContext } from "../context";

import styles from "../dropdown.module.scss";

type Props = {
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Item: FC<Props> = ({ children, onClick, ...otherProps }) => {
  const { toggleOpened } = useDropdownContext();

  const handleDropdownItemClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (onClick) {
      onClick(event);
    }
    toggleOpened();
  };

  return (
    <div
      className={styles.dropdownItem}
      {...otherProps}
      onClick={handleDropdownItemClick}
    >
      {children}
    </div>
  );
};

export default Item;
