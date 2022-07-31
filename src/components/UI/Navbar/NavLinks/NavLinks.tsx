import React, { FC } from "react";
import { Link } from "react-router-dom";

import Button from "../../Button";
import styles from "./navlinks.module.scss";

const NavLinks: FC = () => {
  return (
    <div className={`${styles.navLinks} d-flex align-items-center`}>
      <Link className={styles.navLink} to="/">
        How it works?
      </Link>
      <Link className={styles.navLink} to="/">
        Features
      </Link>
      <Link className={styles.navLink} to="/">
        About us
      </Link>
      <Link className={styles.navLink} to="/login">
        <Button type="outlined">Login</Button>
      </Link>
    </div>
  );
};

export default NavLinks;
