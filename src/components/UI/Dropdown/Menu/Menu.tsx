import React, { FC } from "react";
import { useDropdownContext } from "../context";
import { CSSTransition } from "react-transition-group";

import styles from "../dropdown.module.scss";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
};

const Menu: FC<Props> = ({ children }) => {
  const { isOpened } = useDropdownContext();

  return (
    <CSSTransition
      in={isOpened}
      timeout={200}
      classNames={{
        enter: styles.accordionEnter,
        enterActive: styles.accordionEnterActive,
        exit: styles.accordionExit,
        exitActive: styles.accordionExitActive,
      }}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={classNames(styles.dropdownMenu, {
          [styles.opened]: isOpened,
        })}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

export default Menu;
