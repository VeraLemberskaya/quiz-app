import { AxiosError } from "axios";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";

import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/user/selectors";
import { Button, TextField } from "../../../UI";
import axios from "../../../../axios";

type Props = {
  onSubmit?: () => void;
};

type FormInputs = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

const PasswordForm: FC<Props> = ({ onSubmit }) => {
  const user = useAppSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: "onChange" });

  const checkOldPassword = async () => {
    const inputValue = getValues("oldPassword");
    if (inputValue && !errors.oldPassword) {
      try {
        await axios.post("users/check-password", {
          id: user?.id,
          password: inputValue,
        });
      } catch (err) {
        setError("oldPassword", {
          type: "oldPassword",
          message: `${(err as AxiosError).response?.data}`,
        });
      }
    }
  };

  const checkPasswords = (newPassword: string, newPasswordRepeat: string) => {
    if (newPassword !== newPasswordRepeat) {
      setError("newPasswordRepeat", {
        type: "newPasswordRepeat",
        message: "Repeated password doesn't match.",
      });
      return false;
    }
    return true;
  };

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { newPassword, newPasswordRepeat } = data;
    if (checkPasswords(newPassword, newPasswordRepeat)) {
      const { data: response } = await axios.post("users/change-password", {
        id: user?.id,
        password: newPassword,
      });
      if (response) {
        if (onSubmit) {
          onSubmit();
        }
      }
    }
  };

  const checkField = (name: keyof FormInputs) => {
    if (errors[name]?.type === "minLength") {
      setError(name, {
        type: "minLength",
        message: "Password should contain 6 or more characters.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField
        type="password"
        placeholder="Old password"
        {...register("oldPassword", {
          onBlur() {
            checkField("oldPassword");
            checkOldPassword();
          },
          required: "Field is required",
          minLength: 6,
        })}
        errorIcon={<BiError />}
        error={errors.oldPassword?.message}
      />
      <TextField
        type="password"
        placeholder="New password"
        {...register("newPassword", {
          onBlur() {
            checkField("newPassword");
          },
          required: "Field is required",
          minLength: 6,
        })}
        errorIcon={<BiError />}
        error={errors.newPassword?.message}
      />
      <TextField
        type="password"
        label=" Re-enter your new password:"
        placeholder="New password"
        {...register("newPasswordRepeat", {
          onBlur(event) {
            checkField("newPasswordRepeat");
            const newPassword = getValues("newPassword");
            const passwordRepeate = event.target.value;
            if (!errors.newPasswordRepeat && !errors.newPassword) {
              checkPasswords(newPassword, passwordRepeate);
            }
          },
          required: "Field is required",
          minLength: 6,
        })}
        errorIcon={<BiError />}
        error={errors.newPasswordRepeat?.message}
      />
      <Button
        type="submit"
        buttonType="primary"
        buttonSize="large"
        disabled={!isValid}
      >
        Change password
      </Button>
    </form>
  );
};

export default PasswordForm;
