import React from "react";
import { Link } from "react-router-dom";

import styles from "./navbar.module.css";
import Logo from "../../../assets/logo.svg";
import NavLinks from "./NavLinks";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [sidebarShown, setSidebarShown] = React.useState(false);

  return (
    <div className={styles.NavContainer}>
      <div
        className={`${styles.Navbar} container d-flex justify-content-between align-items-center pb-3 pt-4`}
      >
        <Link to="/">
          <div className={`${styles.NavLogo} user-select-none`}>
            <img className="w-100" src={Logo} alt="QuizGrad" />
          </div>
        </Link>
        <div className={styles.NavLinksHolder}>
          <NavLinks />
        </div>
        <div
          className={styles.Toggler}
          onClick={() => setSidebarShown((prevState) => !prevState)}
        >
          <div
            className={`${styles.Bar} ${sidebarShown ? styles.CrossBar1 : ""}`}
          />
          <div
            className={`${styles.Bar} ${sidebarShown ? styles.CrossBar2 : ""}`}
          />
          <div
            className={`${styles.Bar} ${sidebarShown ? styles.CrossBar3 : ""}`}
          />
        </div>
      </div>
      <Sidebar sidebarShown={sidebarShown} />
    </div>
  );
};

export default Navbar;
