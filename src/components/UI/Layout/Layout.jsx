import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
import BottomBg from "../../../assets/bottom-bg.svg";
import styles from "./layout.module.scss";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <Outlet />
      <div className={styles.bottom} />
    </div>
  );
};

export default Layout;
