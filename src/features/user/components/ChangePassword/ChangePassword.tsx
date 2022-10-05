import { FC } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { VALIDATION_MSG } from "../../../../constants/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import InputControl from "../../../../components/InputControl";
import Button from "../../../../components/UI/Button";
import { useUpdatePasswordMutation } from "../../userService";
import FormTitle from "../../../../components/FormTitle";
import Message from "../../../../components/UI/Message";

type FormInputs = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required(VALIDATION_MSG.required)
    .min(6, VALIDATION_MSG.min(6)),
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

const ChangePassword: FC = () => {
  const [updatePassword, { data, isSuccess }] = useUpdatePasswordMutation();

  const { handleSubmit, control } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    await updatePassword(data);
  };

  return (
    <>
      <FormTitle>Create a new password</FormTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputControl
          control={control}
          type="password"
          name="oldPassword"
          placeholder="Old password"
        />
        <InputControl
          control={control}
          type="password"
          name="password"
          placeholder="New password"
        />
        <InputControl
          control={control}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
        {isSuccess && <Message type="success" text={data?.message} />}
        <Button
          type="submit"
          buttonType="primary"
          buttonSize="large"
          disabled={isSuccess}
        >
          Change password
        </Button>
      </form>
    </>
  );
};

export default ChangePassword;
