import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../../../components/UI/Button";
import Error from "../../../../components/Animated/Error";
import Message from "../../../../components/UI/Message";
import {
  useResetPasswordMutation,
  useVerifyResetLinkQuery,
} from "../../userService";
import { FetchError } from "../../../../api/apiSlice";
import FormTitle from "../../../../components/FormTitle";
import InputControl from "../../../../components/InputControl";
import { VALIDATION_MSG } from "../../../../constants/constants";
import Verify from "../../../../components/Animated/Verify";
import { loginLink } from "../../../../router/AuthRouter/routes";

import styles from "./resetPassword.module.scss";

type FormInputs = {
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
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

const ResetPassword: FC = () => {
  const { userId, token } = useParams();

  const {
    isLoading,
    isError: notVerified,
    error,
  } = useVerifyResetLinkQuery({
    userId,
    token,
  });

  const [resetPassword, { data, isSuccess: resetSuccess }] =
    useResetPasswordMutation();

  const { handleSubmit, control } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    await resetPassword({ userId, token, ...data });
  };

  if (isLoading) {
    return null;
  }

  if (notVerified) {
    return (
      <div className={styles.container}>
        <Error />
        <Message type="error" text={(error as FetchError).data.message} />
        <Link to={loginLink()}>
          <Button buttonSize="large" buttonType="primary">
            Try again
          </Button>
        </Link>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className={styles.container}>
        <Verify />
        <Message type="success" text={data?.message} />
        <Link to={loginLink()}>
          <Button buttonSize="large" buttonType="primary">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <FormTitle>Create a new password</FormTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
        <Button type="submit" buttonSize="large" buttonType="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
