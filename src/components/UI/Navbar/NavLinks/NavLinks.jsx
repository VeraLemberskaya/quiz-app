import React from "react";
import { Link } from "react-router-dom";

import Button from "../../Button";
import styles from "./navlinks.module.css";

const NavLinks = () => {
  return (
    <div className={`${styles.NavLinks} d-flex align-items-center`}>
      <Link className={styles.NavLink} to="/">
        How it works?
      </Link>
      <Link className={styles.NavLink} to="/">
        Features
      </Link>
      <Link className={styles.NavLink} to="/">
        About us
      </Link>
      <Link className={styles.NavLink} to="/">
        <Button type="outlined">Login</Button>
      </Link>
    </div>
  );
};

export default NavLinks;
