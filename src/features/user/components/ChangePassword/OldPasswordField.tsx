import { FC } from "react";
import { useFormContext } from "react-hook-form";

import { useAppSelector } from "../../../../services/hooks";
import { selectCurrentUser } from "../../services/selectors";
import { useCheckPasswordMutation } from "../../services/slice";
import { User } from "../../services/types";
import FormField from "../FormField";
import { FormInputs } from "./ChangePasswordForm";

const OldPasswordField: FC = () => {
  const [checkPassword] = useCheckPasswordMutation();

  const {
    getValues,
    formState: { errors },
  } = useFormContext<FormInputs>();
  const user = useAppSelector(selectCurrentUser) as User;

  const validateOldPassword = () => {
    const oldPassword = getValues("oldPassword");
    if (oldPassword && !errors.oldPassword) {
      checkPassword({ id: user.id, password: oldPassword }).unwrap();
    }
  };

  return (
    <FormField
      type="password"
      name="oldPassword"
      placeholder="Old password"
      rules={{ onBlur: validateOldPassword }}
    />
  );
};

export default OldPasswordField;
