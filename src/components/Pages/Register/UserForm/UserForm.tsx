import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { registerUser, updateUser } from "../../../../api/requests";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/user/selectors";
import { setUser } from "../../../../redux/user/slice";
import Button from "../../../UI/Button";
import TextField from "../../../UI/TextField";
import styles from "./userForm.module.scss";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  password?: string;
};

type EditStatus = "editing" | "success" | "none";

const STATUS_MESSAGES: { [key in EditStatus]: string } = {
  none: "",
  editing: "Edit your personal data.",
  success: "Data have been successfully updated.",
};

const UserForm: FC = () => {
  const [editStatus, setEditStatus] = useState<EditStatus>("none");
  const user = useAppSelector(selectCurrentUser);
  const disabled = !!user && !(editStatus === "editing");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({ mode: "onChange" });

  useEffect(() => {
    if (!!user) {
      setValue("name", user.name);
      setValue("surname", user.surname);
      setValue("email", user.email);
    }
  }, []);

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!user) {
      const response = await registerUser(data);
      if (response) {
        navigate("/login");
      }
    } else {
      const updatedUser = await updateUser(user, data);
      dispatch(setUser(updatedUser));
      setEditStatus("success");
    }
  };
  return (
    <div className={styles.formWrapper}>
      {!!user && (
        <div
          className={`${styles.editRow} d-flex align-items-center w-100 mb-1`}
        >
          {STATUS_MESSAGES[editStatus]}
          <Button
            className="ms-auto"
            buttonType="iconBtn"
            onClick={() => {
              setTimeout(() => setFocus("name"));
              setEditStatus("editing");
            }}
            disabled={editStatus === "editing"}
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
        {!user && (
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
        )}
        {!!user && (
          <Button
            className="ps-0"
            type="button"
            onClick={() => navigate("/change-password")}
          >
            Change password?
          </Button>
        )}
        <Button
          buttonType="primary"
          type="submit"
          buttonSize="large"
          disabled={
            editStatus === "none" ||
            (editStatus === "editing" && !!Object.keys(errors).length)
          }
        >
          {!!user ? "Submit" : "Sign up"}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
