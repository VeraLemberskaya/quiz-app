import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../UI/Navbar";
import styles from "./layout.module.scss";

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <Outlet />
      <div className={styles.bottom} />
    </div>
  );
};

export default Layout;
