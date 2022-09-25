import { FC } from "react";

import FormWrapper from "../features/user/components/FormWrapper";
import FormHeader from "../features/user/components/FormHeader";
import ChangePasswordForm from "../features/user/components/ChangePassword/ChangePasswordForm";

const ChangePassword: FC = () => {
  return (
    <FormWrapper>
      <FormHeader message="Change your old password." />
      <ChangePasswordForm />
    </FormWrapper>
  );
};

export default ChangePassword;
