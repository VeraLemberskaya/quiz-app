import React, { FC } from "react";

import styles from "./login.module.scss";
import GraduateImg from "../../../assets/graduate-hat.svg";
import Logo from "../../../assets/logo.svg";
import { Button, Checkbox, TextField } from "../../UI";
import { Link } from "react-router-dom";

const Login: FC = () => {
  return (
    <div className={`${styles.loginBody} d-flex`}>
      <div className={`${styles.leftSide}`}>
        <div className={styles.header}>
          <img className={styles.logo} src={Logo} alt="QuizGrad" />
          <h4 className={styles.subtitle}>
            Welcome back!
            <br />
            Please login/Signup to your account.
          </h4>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <TextField placeholder="Email Address" />
            <TextField type="password" placeholder="Password" />
            <div className="d-flex justify-content-between my-4">
              <Checkbox label="Remember me" />
              <Link className={styles.link} to="/">
                Forgot password?
              </Link>
            </div>
            <div className={styles.btnContainer}>
              <Button type="primary" buttonSize="large">
                Login
              </Button>
              <Button type="outlined" buttonSize="large">
                {" "}
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className={`${styles.rightSide}`}>
        <img className={styles.image} src={GraduateImg} />
      </div>
    </div>
  );
};

export default Login;
