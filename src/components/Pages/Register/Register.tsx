import React, { FC, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError, BiArrowBack } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import axios from "../../../axios";
import styles from "./register.module.scss";
import Logo from "../../../assets/logo.svg";
import { Button, TextField } from "../../UI";
import { signUpEndPoint } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/user/selectors";
import { useEffect } from "react";
import { setUser } from "../../../redux/user/slice";
import PasswordForm from "./PasswordForm";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  password?: string;
};

const Register: FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editSuccess, setEditSuccess] = useState<boolean>(false);
  const [passwordFormVisible, setPasswordFormVisible] =
    useState<boolean>(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] =
    useState<boolean>(false);

  const user = useAppSelector(selectCurrentUser);
  const isAccountPage = !!user;
  const disabled = isAccountPage && !isEditable;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({ mode: "onChange" });

  useEffect(() => {
    if (isAccountPage) {
      setValue("name", user.name);
      setValue("surname", user.surname);
      setValue("email", user.email);
    }
  }, []);

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!isAccountPage) {
      const { data: response } = await axios.post(signUpEndPoint, data);
      if (response) {
        navigate("/login");
      }
    } else {
      const { data: response } = await axios.put(`users/${user.id}`, data);
      dispatch(setUser(response));
      setIsEditable(false);
      setEditSuccess(true);
    }
  };

  const handleBtnBackClick = () => {
    if (passwordFormVisible) {
      setPasswordFormVisible(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.registerBody}>
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <Button
            buttonType="iconBtn"
            onClick={handleBtnBackClick}
            className={`position-absolute top-0 start-0 mt-2 ms-2`}
          >
            <BiArrowBack />
          </Button>
          <img className={styles.logo} src={Logo} alt="QuizGrad" />
          <h4 className={styles.subtitle}>
            {isAccountPage
              ? `Hello, ${user.name} ${user.surname}!`
              : "Please register your account."}
          </h4>
        </div>
        {!passwordFormVisible ? (
          <>
            {isAccountPage && (
              <div
                className={`${styles.editRow} d-flex align-items-center w-100 mb-1`}
              >
                {passwordChangeSuccess
                  ? "Password has been successfully updated."
                  : isEditable
                  ? "Edit your personal data."
                  : editSuccess && "Data have been successfully updated."}
                <Button
                  buttonType="iconBtn"
                  onClick={() => {
                    setTimeout(() => setFocus("name"));
                    setIsEditable(true);
                  }}
                  disabled={isEditable}
                >
                  <AiOutlineEdit />
                </Button>
              </div>
            )}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                disabled={disabled}
              />
              {!isAccountPage && (
                <TextField
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    onBlur() {
                      if (errors.password?.type === "minLength") {
                        setError("password", {
                          type: "minLength",
                          message:
                            "Password should contain 6 or more characters.",
                        });
                      }
                    },
                    required: "Field is required.",
                    minLength: 6,
                  })}
                  errorIcon={<BiError />}
                  error={errors.password?.message}
                />
              )}
              {isAccountPage && (
                <Button
                  className="ps-0"
                  type="button"
                  onClick={() => setPasswordFormVisible(true)}
                >
                  Change password?
                </Button>
              )}
              <Button
                buttonType="primary"
                type="submit"
                buttonSize="large"
                disabled={isEditable && !!Object.keys(errors).length}
              >
                {isAccountPage ? "Submit" : "Sign up"}
              </Button>
            </form>
          </>
        ) : (
          <PasswordForm
            onSubmit={() => {
              setPasswordFormVisible(false);
              setPasswordChangeSuccess(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
