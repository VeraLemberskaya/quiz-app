import React from "react";
import NavLinks from "../NavLinks";

import styles from "./sidebar.module.css";

const Sidebar = ({ sidebarShown }) => {
  return (
    <div className={styles.SideBarHolder}>
      <div
        className={`${styles.SideBarBody} ${
          sidebarShown ? "" : styles.SideBarClosed
        }`}
      >
        <NavLinks />
      </div>
    </div>
  );
};

export default Sidebar;
