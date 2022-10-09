import { FC, useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isEqual } from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../../../components/UI/Button";
import { useAuth } from "../../../../hooks/useAuth";
import { User } from "../../../../types/types";
import { VALIDATION_MSG } from "../../../../constants/constants";
import InputControl from "../../../../components/InputControl";
import { useUpdateUserMutation } from "../../userService";
import { changePasswordLink } from "../../../../router/UserRouter/routes";
import EmailTooltip from "./EmailTooltip";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
};

type Props = {
  disabled: boolean;
  onSubmitSuccess: () => void;
};

const schema = yup.object().shape({
  name: yup.string().required(VALIDATION_MSG.required),
  surname: yup.string().required(VALIDATION_MSG.required),
  email: yup
    .string()
    .required(VALIDATION_MSG.required)
    .email(VALIDATION_MSG.email),
});

const UserForm: FC<Props> = ({ disabled, onSubmitSuccess }) => {
  const [updateUser, { isSuccess }] = useUpdateUserMutation();

  const user = useAuth().user as User;

  const { handleSubmit, control, setFocus, watch } = useForm<FormInputs>({
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
    },
    resolver: yupResolver(schema),
  });

  const watchFormValue = watch();

  useEffect(() => {
    if (!disabled) {
      setFocus("name");
    }
  }, [disabled]);

  useEffect(() => {
    if (isSuccess) {
      onSubmitSuccess();
    }
  }, [isSuccess]);

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    await updateUser({ id: user.id, ...data });
  };

  const submitDisabled = useMemo(() => {
    const { id, ...userData } = user;
    if (disabled || isEqual(watchFormValue, userData)) {
      return true;
    }
    return false;
  }, [disabled, user, watchFormValue]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputControl
        control={control}
        name="name"
        placeholder="Name"
        disabled={disabled}
      />
      <InputControl
        control={control}
        name="surname"
        placeholder="Surname"
        disabled={disabled}
      />
      <div className="position-relative">
        <EmailTooltip />
        <InputControl
          control={control}
          name="email"
          placeholder="Email"
          disabled
        />
      </div>
      <span>
        <Button className="ps-0" type="button">
          <Link to={changePasswordLink()}>Change password?</Link>
        </Button>
      </span>
      <Button
        buttonType="primary"
        type="submit"
        buttonSize="large"
        disabled={submitDisabled}
      >
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
