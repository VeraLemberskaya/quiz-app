import React from "react";
import NavLinks from "../NavLinks";

import styles from "./sidebar.module.scss";

type SidebarProps = {
  sidebarShown: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarShown }) => {
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
