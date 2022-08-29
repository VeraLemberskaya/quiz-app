import { FC } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import Button from "../../../../../components/UI/Button";
import Checkbox from "../../../../../components/UI/Checkbox";
import {
  useAuthenticateUserMutation,
  useSaveUserMutation,
} from "../../../services/slice";
import FormField from "../../FormField";

import styles from "./loginForm.module.scss";

type FormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: FC = () => {
  const [authenticateUser] = useAuthenticateUserMutation();
  const [saveUser] = useSaveUserMutation();

  const navigate = useNavigate();

  const methods = useForm<FormInputs>({ mode: "onChange" });

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = methods;

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { rememberMe, ...credentials } = data;
    const user = await authenticateUser(credentials).unwrap();
    if (user && rememberMe) {
      const response = await saveUser(user).unwrap();
      if (response) {
        localStorage.setItem("rememberMe", "true");
      }
      navigate("/");
    }
  };

  return (
    <div className={styles.formContainer}>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
          <FormField name="email" type="email" />
          <FormField name="password" type="password" />
          <div className="d-flex justify-content-between my-4">
            <Checkbox label="Remember me" {...register("rememberMe")} />
            <Link className={styles.link} to="/">
              Forgot password?
            </Link>
          </div>
          <div className={styles.btnContainer}>
            <Button buttonType="primary" buttonSize="large" disabled={!isValid}>
              Login
            </Button>
            <Link to="/register">
              <Button buttonType="outlined" type="button" buttonSize="large">
                Sign up
              </Button>
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
