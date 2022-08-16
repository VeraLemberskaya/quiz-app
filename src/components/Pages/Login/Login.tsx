import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import styles from "./login.module.scss";
import GraduateImg from "../../../assets/graduate-hat.svg";
import Logo from "../../../assets/logo.svg";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/user/slice";
import { authenticateUser, saveUser } from "../../../api/requests";
import Button from "../../UI/Button";
import Checkbox from "../../UI/Checkbox";
import TextField from "../../UI/TextField";

type FormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: "onChange" });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { rememberMe, ...credentials } = data;
    const user = await authenticateUser(credentials);
    if (user) {
      if (rememberMe) {
        const response = await saveUser(user);
        if (response) {
          localStorage.setItem("rememberMe", "true");
        }
      }
      dispatch(setUser(user));
      navigate("/");
    }
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
                onBlur() {
                  if (errors.email?.type === "pattern") {
                    setError("email", {
                      type: "pattern",
                      message: "Please enter correct email.",
                    });
                  }
                },
                required: "Field is required.",
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              })}
              errorIcon={<BiError />}
              error={errors.email?.message}
            />
            <TextField
              type="password"
              placeholder="Password"
              {...register("password", {
                onBlur() {
                  if (errors.password?.type === "minLength") {
                    setError("password", {
                      type: "minLength",
                      message: "Password should contain 6 or more characters.",
                    });
                  }
                },
                required: "Field is required.",
                minLength: 6,
              })}
              errorIcon={<BiError />}
              error={errors.password?.message}
            />
            <div className="d-flex justify-content-between my-4">
              <Checkbox label="Remember me" {...register("rememberMe")} />
              <Link className={styles.link} to="/">
                Forgot password?
              </Link>
            </div>
            <div className={styles.btnContainer}>
              <Button
                buttonType="primary"
                buttonSize="large"
                disabled={!isValid}
              >
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
