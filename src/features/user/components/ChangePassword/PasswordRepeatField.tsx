import { FC } from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../FormField";
import { ERRORS, FormInputs } from "./ChangePasswordForm";

const PasswordRepeatField: FC = () => {
  const {
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<FormInputs>();

  const validateNewPassword = () => {
    if (!errors.newPassword && !errors.newPasswordRepeat) {
      const newPassword = getValues("newPassword");
      const passwordRepeat = getValues("newPasswordRepeat");
      if (newPassword !== passwordRepeat) {
        setError("newPasswordRepeat", ERRORS.newPasswordRepeat.mismatch);
      }
    }
  };

  return (
    <FormField
      type="password"
      name="newPasswordRepeat"
      placeholder="New password"
      rules={{ onBlur: validateNewPassword }}
    />
  );
};

export default PasswordRepeatField;
