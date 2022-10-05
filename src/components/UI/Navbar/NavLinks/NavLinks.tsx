import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser, BiExit } from "react-icons/bi";

import Button from "../../Button";
import styles from "./navlinks.module.scss";
import Dropdown from "../../Dropdown";
import { useAuth } from "../../../../hooks/useAuth";
import PermissionGate from "../../../../features/auth/components/PermissionGate";
import { useLogoutMutation } from "../../../../features/auth/authService";
import { usePersist } from "../../../../hooks/usePersist";
import { PERMISSIONS } from "../../../../config/permissions";
import { accountLink } from "../../../../router/UserRouter/routes";
import { loginLink } from "../../../../router/AuthRouter/routes";

const NavLinks: FC = () => {
  const { isAuth, user } = useAuth();
  const { clearPersist } = usePersist();

  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogOut = async () => {
    await logout();
    clearPersist();
    navigate(loginLink());
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
      <PermissionGate permissions={[PERMISSIONS.updateSettings]}>
        <Link className={styles.navLink} to="/settings">
          Settings
        </Link>
      </PermissionGate>
      <Link className={styles.navLink} to="/statistics">
        Statistics
      </Link>
      {isAuth ? (
        <>
          <Link
            className={`${styles.navLink} ${styles.phoneOnly}`}
            to={accountLink()}
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
              {user?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link to={accountLink()}>
                <Dropdown.Item>Account</Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <Link className={styles.navLink} to={loginLink()}>
          <Button buttonType="outlined">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default NavLinks;
