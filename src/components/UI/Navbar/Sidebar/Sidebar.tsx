import classNames from "classnames";
import React, { FC } from "react";
import NavLinks from "../NavLinks";

import styles from "./sidebar.module.scss";

type Props = {
  sidebarShown: boolean;
  onClose: () => void;
};

const Sidebar: FC<Props> = ({ sidebarShown, onClose }) => {
  return (
    <div className={styles.sideBarHolder}>
      <div
        className={classNames(styles.sideBarBody, {
          [styles.sideBarClosed]: !sidebarShown,
        })}
        onClick={onClose}
      >
        <NavLinks />
      </div>
    </div>
  );
};

export default Sidebar;
