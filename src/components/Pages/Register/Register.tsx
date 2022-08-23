import { FC } from "react";

import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/user/selectors";
import UserForm from "./UserForm";
import FormWrapper from "./FormWrapper";
import FormHeader from "./FormHeader";

const Register: FC = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <FormWrapper>
      <FormHeader
        message={
          !!user
            ? `Hello, ${user.name} ${user.surname}`
            : "Please register your account."
        }
      />
      <UserForm />
    </FormWrapper>
  );
};

export default Register;
