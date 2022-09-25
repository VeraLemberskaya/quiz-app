import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/UI/Button";
import { useRegisterUserMutation } from "../../services/slice";
import FormField from "../FormField";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const RegisterForm: FC = () => {
  const [registerUser] = useRegisterUserMutation();

  const navigate = useNavigate();

  const methods = useForm<FormInputs>({ mode: "onChange" });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const response = await registerUser(data).unwrap();
    if (response) {
      navigate("/login");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormField name="name" type="name" />
        <FormField name="surname" type="name" placeholder="Surname" />
        <FormField name="email" type="email" />
        <FormField name="password" type="password" />
        <Button
          buttonType="primary"
          type="submit"
          buttonSize="large"
          disabled={!isValid}
        >
          Sign up
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
