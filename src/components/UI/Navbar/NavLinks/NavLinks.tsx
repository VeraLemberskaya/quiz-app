import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser, BiExit } from "react-icons/bi";
import { resetUser } from "../../../../redux/user/slice";

import Button from "../../Button";
import styles from "./navlinks.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/user/selectors";
import Dropdown from "../../Dropdown";
import { hasPermission } from "../../../../utils";

const NavLinks: FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("rememberMe");
    dispatch(resetUser());
    navigate("/login");
  };

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
      {user && hasPermission(user, "CONFIGURE_SETTINGS") && (
        <Link className={styles.navLink} to="/settings">
          Settings
        </Link>
      )}
      <Link className={styles.navLink} to="/statistics">
        Statistics
      </Link>
      {user ? (
        <>
          <Link
            className={`${styles.navLink} ${styles.phoneOnly}`}
            to="/account"
          >
            Account
          </Link>
          <span
            onClick={handleLogOut}
            className={`${styles.navLink} ${styles.logOutLink} ${styles.phoneOnly}`}
          >
            Log out
            <BiExit />
          </span>
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle>
              <BiUser />
              {user.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link to="/account">
                <Dropdown.Item>Account</Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <Link className={styles.navLink} to="/login">
          <Button buttonType="outlined">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default NavLinks;
