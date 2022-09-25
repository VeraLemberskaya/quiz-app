import { FC } from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../FormField";
import { ERRORS, FormInputs } from "./ChangePasswordForm";

const NewPasswordField: FC = () => {
  const {
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormInputs>();

  const validateNewPassword = () => {
    const newPassword = getValues("newPassword");
    const newPasswordRepeat = getValues("newPasswordRepeat");
    if (
      errors.newPasswordRepeat?.type ===
        ERRORS.newPasswordRepeat.mismatch.type &&
      newPassword === newPasswordRepeat
    ) {
      clearErrors("newPasswordRepeat");
    }
  };

  return (
    <FormField
      type="password"
      name="newPassword"
      placeholder="New password"
      rules={{
        onChange: validateNewPassword,
      }}
    />
  );
};

export default NewPasswordField;
