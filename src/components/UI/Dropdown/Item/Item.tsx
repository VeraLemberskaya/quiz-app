import React, { FC } from "react";

import styles from "../dropdown.module.scss";

type Props = {
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Item: FC<Props> = ({ children, ...otherProps }) => {
  return (
    <div className={styles.dropdownItem} {...otherProps}>
      {children}
    </div>
  );
};

export default Item;
