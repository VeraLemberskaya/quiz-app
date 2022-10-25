import { FC } from "react";

import classNames from "classnames";

import GraduateImg from "../../../../assets/images/graduate-hat.svg";

import Logo from "../../../../assets/images/logo.svg";
import LoginForm from "../LoginForm";

import styles from "./login.module.scss";

const Login: FC = () => {
  return (
    <div className={classNames(styles.loginBody, "d-flex")}>
      <div className={styles.leftSide}>
        <div className={styles.header}>
          <img className={styles.logo} src={Logo} alt="QuizGrad" />
          <h4 className={styles.subtitle}>
            You are welcome!
            <br />
            Please login/sign up to your account.
          </h4>
        </div>
        <LoginForm />
      </div>
      <div className={styles.rightSide}>
        <img className={styles.image} src={GraduateImg} alt="graduate" />
      </div>
    </div>
  );
};

export default Login;
