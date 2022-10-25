import React, { FC } from "react";

import classNames from "classnames";

import { useDropdownContext } from "../context";

import styles from "../dropdown.module.scss";

import AccordionTransition from "../../../Utils/AccordionTransition";

type Props = {
  children: React.ReactNode;
};

const Menu: FC<Props> = ({ children }) => {
  const { isOpened } = useDropdownContext();

  return (
    <AccordionTransition inProp={isOpened} timeout={200} styles={styles}>
      <div
        className={classNames(styles.dropdownMenu, {
          [styles.opened]: isOpened,
        })}
      >
        {children}
      </div>
    </AccordionTransition>
  );
};

export default Menu;
