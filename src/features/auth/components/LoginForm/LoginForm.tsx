import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../../../components/UI/Button";
import Message from "../../../../components/UI/Message";
import { useLoginMutation } from "../../authService";

import styles from "./loginForm.module.scss";
import { VALIDATION_MSG } from "../../../../constants/constants";
import InputControl from "../../../../components/InputControl";
import CheckboxControl from "../../../../components/CheckboxControl/CheckboxControl";
import { usePersist } from "../../../../hooks/usePersist";
import { FetchError } from "../../../../api/apiSlice";
import { forgotPasswordLink } from "../../../../router/UserRouter/routes";
import { registerLink } from "../../../../router/AuthRouter/routes";

type FormInputs = {
  email: string;
  password: string;
  persist: boolean;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required(VALIDATION_MSG.required)
    .email(VALIDATION_MSG.email),
  password: yup
    .string()
    .required(VALIDATION_MSG.required)
    .min(6, VALIDATION_MSG.min(6)),
});

const LoginForm: FC = () => {
  const { persist, setPersist } = usePersist();
  const [login, { error, isError }] = useLoginMutation();

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      persist: persist,
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { email, password, persist } = data;
    const response = await login({ email, password }).unwrap();

    if (response) {
      setPersist(persist);
      navigate("/");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputControl control={control} name="email" placeholder="Email" />
        <InputControl
          control={control}
          type="password"
          name="password"
          placeholder="Password"
        />
        <div className="d-flex justify-content-between my-4">
          <CheckboxControl
            name="persist"
            control={control}
            label="Remember me"
          />
          <Link className={styles.link} to={forgotPasswordLink()}>
            Forgot password?
          </Link>
        </div>
        {isError && (
          <Message
            type="error"
            text={`${(error as FetchError).data.message}`}
          />
        )}
        <div className={styles.btnContainer}>
          <Button buttonType="primary" buttonSize="large">
            Login
          </Button>
          <Link to={registerLink()}>
            <Button buttonType="outlined" type="button" buttonSize="large">
              Sign up
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
