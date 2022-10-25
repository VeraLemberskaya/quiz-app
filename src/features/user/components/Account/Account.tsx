import { FC } from "react";

import UserForm from "../UserForm";
import { useAuth } from "../../../../hooks/useAuth";
import FormTitle from "../../../../components/FormTitle";
import EditStatusProvider from "../EditStatusProvider";
import UserFormStatus from "../UserFormStatus";

const Account: FC = () => {
  const { user } = useAuth();

  return (
    <EditStatusProvider>
      <FormTitle>{`Hello, ${user?.name} ${user?.surname}`}</FormTitle>
      <UserFormStatus />
      <UserForm />
    </EditStatusProvider>
  );
};

export default Account;
