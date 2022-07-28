import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";

import styles from "./register.module.scss";
import Logo from "../../../assets/logo.svg";
import { Button, TextField } from "../../UI";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: "onChange" });

  const handleLoginFormSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.registerBody}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <img className={styles.logo} src={Logo} alt="QuizGrad" />
          <h4 className={styles.subtitle}>Please register your account.</h4>
        </div>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleLoginFormSubmit)}
        >
          <TextField
            placeholder="Name"
            {...register("name", {
              required: "Field is required.",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Incorrect input.",
              },
            })}
            errorIcon={<BiError />}
            error={errors.name?.message}
          />
          <TextField
            placeholder="Surname"
            {...register("surname", {
              required: "Field is required.",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Incorrect input.",
              },
            })}
            errorIcon={<BiError />}
            error={errors.surname?.message}
          />

          <TextField
            placeholder="Email Address"
            {...register("email", {
              required: "Field is required.",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Incorrect input.",
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
          <Button
            className={styles.btnSubmit}
            buttonType="outlined"
            buttonSize="large"
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
