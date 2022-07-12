import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
import styles from "./layout.module.css";

const Layout = () => {
  return (
    <div className={styles.Layout}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
