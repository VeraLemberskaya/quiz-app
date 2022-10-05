import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../../../components/UI/Button";
import Message from "../../../../components/UI/Message";
import InputControl from "../../../../components/InputControl";
import { useRegisterMutation } from "../../authService";
import { VALIDATION_MSG } from "../../../../constants/constants";
import FormTitle from "../../../../components/FormTitle";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required(VALIDATION_MSG.required),
  surname: yup.string().required(VALIDATION_MSG.required),
  email: yup
    .string()
    .required(VALIDATION_MSG.required)
    .email(VALIDATION_MSG.email),
  password: yup
    .string()
    .required(VALIDATION_MSG.required)
    .min(6, VALIDATION_MSG.min(6)),
  confirmPassword: yup
    .string()
    .required(VALIDATION_MSG.required)
    .min(6, VALIDATION_MSG.min(6))
    .oneOf([yup.ref("password")], VALIDATION_MSG.confirmPassword),
});

const Register: FC = () => {
  const [register, { data, isSuccess }] = useRegisterMutation();

  const { handleSubmit, control } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    await register(data).unwrap();
  };

  return (
    <>
      <FormTitle>Please register your account.</FormTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputControl control={control} name="name" placeholder="Name" />
        <InputControl control={control} name="surname" placeholder="Surname" />
        <InputControl control={control} name="email" placeholder="Email" />
        <InputControl
          control={control}
          type="password"
          name="password"
          placeholder="Password"
        />
        <InputControl
          control={control}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
        {isSuccess && <Message type="success" text={data?.message} />}
        <Button
          buttonType="primary"
          type="submit"
          buttonSize="large"
          disabled={isSuccess}
        >
          Sign up
        </Button>
      </form>
    </>
  );
};

export default Register;
