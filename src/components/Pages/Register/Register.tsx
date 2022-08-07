import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import axios from "../../../axios";
import styles from "./register.module.scss";
import Logo from "../../../assets/logo.svg";
import { Button, TextField } from "../../UI";
import { signUpEndPoint } from "../../../constants";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/user/selectors";
import { useEffect } from "react";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const Register: FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const user = useAppSelector(selectCurrentUser);
  const isAccountPage = !!user;
  const disabled = isAccountPage && !isEditable;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({ mode: "onBlur" });

  useEffect(() => {
    if (isAccountPage) {
      setValue("name", user.name);
      setValue("surname", user.surname);
      setValue("email", user.email);
      setValue("password", user.password);
    }
  }, []);

  const handleLoginFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { data: response } = await axios.post(signUpEndPoint, data);
    if (response) {
      navigate("/login");
    }
  };

  return (
    <div className={styles.registerBody}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <img className={styles.logo} src={Logo} alt="QuizGrad" />
          <h4 className={styles.subtitle}>
            {isAccountPage
              ? `Hello, ${user.name} ${user.surname}!`
              : "Please register your account."}
          </h4>
        </div>
        {isAccountPage && (
          <div
            className={`${styles.editRow} d-flex align-items-center w-100 mb-1`}
          >
            {isEditable && "Edit your personal data."}
            <button
              className={styles.editBtn}
              onClick={() => setIsEditable(true)}
              disabled={isEditable}
            >
              <AiOutlineEdit />
            </button>
          </div>
        )}
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleLoginFormSubmit)}
        >
          <TextField
            value={user?.name}
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
            disabled={disabled}
            focused={isAccountPage && isEditable}
          />
          <TextField
            value={user?.surname}
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
            disabled={disabled}
          />

          <TextField
            value={user?.email}
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
            disabled={disabled}
          />
          <TextField
            value={user?.password}
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
            disabled={disabled}
          />
          <Button
            className={styles.btnSubmit}
            buttonType="primary"
            buttonSize="large"
            disabled={disabled}
          >
            {isAccountPage ? "Submit" : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
