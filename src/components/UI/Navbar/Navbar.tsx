import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./navbar.module.scss";
import Logo from "../../../assets/images/logo.svg";
import NavLinks from "./NavLinks";
import Sidebar from "./Sidebar";

const Navbar: FC = () => {
  const [sidebarShown, setSidebarShown] = useState<boolean>(false);

  return (
    <div className={styles.navContainer}>
      <div
        className={`${styles.navbar} container d-flex justify-content-between align-items-center pb-3 pt-4`}
      >
        <Link to="/" onClick={() => setSidebarShown(false)}>
          <div className={`${styles.navLogo} user-select-none`}>
            <img className="w-100" src={Logo} alt="QuizGrad" />
          </div>
        </Link>
        <div className={styles.navLinksHolder}>
          <NavLinks />
        </div>
        <div
          className={styles.toggler}
          onClick={() => setSidebarShown((prevState) => !prevState)}
        >
          <div
            className={`${styles.bar} ${sidebarShown ? styles.crossBar1 : ""}`}
          />
          <div
            className={`${styles.bar} ${sidebarShown ? styles.crossBar2 : ""}`}
          />
          <div
            className={`${styles.bar} ${sidebarShown ? styles.crossBar3 : ""}`}
          />
        </div>
      </div>
      <Sidebar
        sidebarShown={sidebarShown}
        onClose={() => setSidebarShown(false)}
      />
    </div>
  );
};

export default Navbar;
