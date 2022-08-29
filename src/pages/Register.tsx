import { FC } from "react";
import FormHeader from "../features/user/components/FormHeader";
import FormWrapper from "../features/user/components/FormWrapper";
import RegisterForm from "../features/user/components/Register/RegisterForm";

const Register: FC = () => {
  return (
    <FormWrapper>
      <FormHeader message="Please register your account." />
      <RegisterForm />
    </FormWrapper>
  );
};

export default Register;
