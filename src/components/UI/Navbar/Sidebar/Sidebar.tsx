import React, { FC } from "react";
import NavLinks from "../NavLinks";

import styles from "./sidebar.module.scss";

type Props = {
  sidebarShown: boolean;
};

const Sidebar: FC<Props> = ({ sidebarShown }) => {
  return (
    <div className={styles.sideBarHolder}>
      <div
        className={`${styles.sideBarBody} ${
          sidebarShown ? "" : styles.sideBarClosed
        }`}
      >
        <NavLinks />
      </div>
    </div>
  );
};

export default Sidebar;
