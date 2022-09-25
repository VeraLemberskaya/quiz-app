import { FC } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../../../components/UI/Button";
import { useAppSelector } from "../../../../services/hooks";
import { selectCurrentUser } from "../../services/selectors";
import { useUpdatePasswordMutation } from "../../services/slice";
import { User } from "../../services/types";
import NewPasswordField from "./NewPasswordField";
import OldPasswordField from "./OldPasswordField";
import PasswordRepeatField from "./PasswordRepeatField";

export type FormInputs = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export const ERRORS = {
  newPasswordRepeat: {
    mismatch: {
      type: "mismatch",
      message: "Repeated password doesn't match.",
    },
  },
};

const ChangePasswordForm: FC = () => {
  const [updatePassword] = useUpdatePasswordMutation();

  const user = useAppSelector(selectCurrentUser) as User;
  const navigate = useNavigate();

  const methods = useForm<FormInputs>({ mode: "onChange" });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { newPassword, newPasswordRepeat } = data;
    if (newPassword === newPasswordRepeat) {
      const response = await updatePassword({
        id: user.id,
        password: newPassword,
      }).unwrap();
      if (response) {
        toast.success("Password has been successfully updated.");
        navigate("/account");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <OldPasswordField />
        <NewPasswordField />
        <PasswordRepeatField />
        <Button
          type="submit"
          buttonType="primary"
          buttonSize="large"
          disabled={!isValid}
        >
          Change password
        </Button>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
