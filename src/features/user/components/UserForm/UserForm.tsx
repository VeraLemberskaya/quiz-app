import { FC, useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isEqual } from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { changePasswordLink } from "../../../../router/UserRouter/routes";
import Button from "../../../../components/UI/Button";
import { useAuth } from "../../../../hooks/useAuth";
import { User } from "../../../../types/types";
import { VALIDATION_MSG } from "../../../../constants/constants";
import InputControl from "../../../../components/InputControl";

import { useUpdateUserMutation } from "../../userService";
import { useEditStatus } from "../../hooks/useEditStatus";

import EmailTooltip from "./EmailTooltip";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
};

const schema = yup.object().shape({
  name: yup.string().required(VALIDATION_MSG.required),
  surname: yup.string().required(VALIDATION_MSG.required),
  email: yup
    .string()
    .required(VALIDATION_MSG.required)
    .email(VALIDATION_MSG.email),
});

const UserForm: FC = () => {
  const [updateUser, { isSuccess }] = useUpdateUserMutation();

  const user = useAuth().user as User;
  const { isEditing, setSuccess } = useEditStatus();

  const initialState = useMemo(
    () => ({
      name: user.name,
      surname: user.surname,
      email: user.email,
    }),
    [user.name, user.surname, user.email]
  );

  const { handleSubmit, control, setFocus, watch } = useForm<FormInputs>({
    defaultValues: initialState,
    resolver: yupResolver(schema),
  });

  const watchFormValue = watch();

  useEffect(() => {
    if (isEditing) {
      setFocus("name");
    }
  }, [isEditing, setFocus]);

  useEffect(() => {
    if (isSuccess) {
      setSuccess();
    }
  }, [isSuccess, setSuccess]);

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    await updateUser({ id: user.id, ...data });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputControl
        control={control}
        name="name"
        placeholder="Name"
        disabled={!isEditing}
      />
      <InputControl
        control={control}
        name="surname"
        placeholder="Surname"
        disabled={!isEditing}
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
        disabled={!isEditing || isEqual(watchFormValue, initialState)}
      >
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
