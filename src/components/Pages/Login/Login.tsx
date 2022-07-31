import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../../axios";
import styles from "./login.module.scss";
import GraduateImg from "../../../assets/graduate-hat.svg";
import Logo from "../../../assets/logo.svg";
import { Button, Checkbox, TextField } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setUser } from "../../../redux/user/slice";
import { loginEndPoint } from "../../../constants";

type FormInputs = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: "onBlur" });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { data: responseData } = await axios.post(loginEndPoint, data);
    dispatch(setUser(responseData));
    navigate("/");
  };

  return (
    <div className={`${styles.loginBody} d-flex`}>
      <div className={`${styles.leftSide}`}>
        <div className={styles.header}>
          <img className={styles.logo} src={Logo} alt="QuizGrad" />
          <h4 className={styles.subtitle}>
            You are welcome!
            <br />
            Please login/sign up to your account.
          </h4>
        </div>
        <div className={styles.formContainer}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <TextField
              placeholder="Email Address"
              {...register("email", {
                required: "Field is required.",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Please enter correct email.",
                },
              })}
              errorIcon={<BiError />}
              error={errors.email?.message}
            />
            <TextField
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Field is required.",
                minLength: {
                  value: 6,
                  message: "Password should contain 6 or more characters.",
                },
              })}
              errorIcon={<BiError />}
              error={errors.password?.message}
            />
            <div className="d-flex justify-content-between my-4">
              <Checkbox label="Remember me" />
              <Link className={styles.link} to="/">
                Forgot password?
              </Link>
            </div>
            <div className={styles.btnContainer}>
              <Button buttonType="primary" buttonSize="large">
                Login
              </Button>
              <Link to="/register">
                <Button buttonType="outlined" type="button" buttonSize="large">
                  Sign up
                </Button>
              </Link>
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
