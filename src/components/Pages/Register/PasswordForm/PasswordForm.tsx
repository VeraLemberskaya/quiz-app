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
    if (inputValue && inputValue.length >= 6) {
      try {
        await axios.post("users/check-password", {
          id: user?.id,
          password: inputValue,
        });
      } catch (err) {
        setError("oldPassword", {
          type: "custom",
          message: `${(err as AxiosError).response?.data}`,
        });
      }
    }
  };

  const checkNewPassword = () => {
    const newPassword = getValues("newPassword");
    const newPasswordRepeat = getValues("newPasswordRepeat");
    if (newPassword !== newPasswordRepeat) {
      setError("newPasswordRepeat", {
        type: "custom",
        message: "Repeated password doesn't match.",
      });
    }
  };

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const newPassword = getValues("newPassword");
    const newPasswordRepeat = getValues("newPasswordRepeat");
    if (newPassword !== newPasswordRepeat) {
      setError("newPasswordRepeat", {
        type: "custom",
        message: "Repeated password doesn't match.",
      });
    } else {
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
    const value = getValues(name);
    if (value.length > 0 && value.length < 6) {
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
            const value = event.target.value;
            if (value.length >= 6) {
              checkNewPassword();
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
