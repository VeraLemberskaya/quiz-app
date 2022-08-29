import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isEqual } from "lodash";

import Button from "../../../../components/UI/Button";
import { useAppSelector } from "../../../../services/hooks";
import { selectCurrentUser } from "../../services/selectors";
import { useUpdateUserMutation } from "../../services/slice";
import { User } from "../../services/types";
import FormField from "../FormField";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
};

type Props = {
  disabled: boolean;
  onSubmit: () => void;
};

const UserForm: FC<Props> = ({ disabled, onSubmit }) => {
  const [updateUser] = useUpdateUserMutation();

  const user = useAppSelector(selectCurrentUser) as User;

  const methods = useForm<FormInputs>({ mode: "onChange" });

  const {
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { isValid },
  } = methods;

  const watchFormValue = watch();

  useEffect(() => {
    setValue("name", user.name);
    setValue("surname", user.surname);
    setValue("email", user.email);
  }, []);

  useEffect(() => {
    if (!disabled) {
      setFocus("name");
    }
  }, [disabled]);

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const updatedUser = await updateUser({ id: user.id, ...data }).unwrap();
    if (updatedUser) {
      onSubmit();
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormField
          name="name"
          defaultValue={user?.name}
          type="name"
          disabled={disabled}
        />
        <FormField
          name="surname"
          defaultValue={user?.surname}
          type="name"
          placeholder="Surname"
          disabled={disabled}
        />
        <FormField
          name="email"
          type="email"
          defaultValue={user?.email}
          disabled={disabled}
        />
        <span>
          <Button className="ps-0" type="button">
            <Link to="/change-password">Change password?</Link>
          </Button>
        </span>
        <Button
          buttonType="primary"
          type="submit"
          buttonSize="large"
          disabled={
            disabled ||
            !isValid ||
            isEqual(watchFormValue, {
              name: user.name,
              surname: user.surname,
              email: user.email,
            })
          }
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default UserForm;
