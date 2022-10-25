import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import FormTitle from "../../../../components/FormTitle";
import { VALIDATION_MSG } from "../../../../constants/constants";
import InputControl from "../../../../components/InputControl";
import Button from "../../../../components/UI/Button";
import { useForgotPasswordMutation } from "../../userService";
import Message from "../../../../components/UI/Message";

type FormInput = {
  email: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required(VALIDATION_MSG.required)
    .email(VALIDATION_MSG.email),
});

const ForgotPassword: FC = () => {
  const [forgotPassword, { data, isSuccess }] = useForgotPasswordMutation();

  const { handleSubmit, control } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormInput> = async (data) => {
    await forgotPassword(data);
  };

  return (
    <>
      <FormTitle>Enter your e-mail.</FormTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputControl name="email" placeholder="Email" control={control} />
        {isSuccess && <Message type="success" text={data?.message} />}
        <Button
          type="submit"
          buttonType="primary"
          buttonSize="large"
          disabled={isSuccess}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default ForgotPassword;
