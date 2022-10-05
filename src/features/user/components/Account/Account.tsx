import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "../../../../components/UI/Button";
import UserForm from "../UserForm";
import { useEditStatus } from "../../hooks/useEditStatus";

import { useAuth } from "../../../../hooks/useAuth";
import FormTitle from "../../../../components/FormTitle";

const Account: FC = () => {
  const { setEditing, setSuccess, message, isEditing } = useEditStatus();
  const { user } = useAuth();

  return (
    <>
      <FormTitle>{`Hello, ${user?.name} ${user?.surname}`}</FormTitle>
      <div className="text-secondary d-flex align-items-center w-100 mb-1">
        {message}
        <Button
          className="ms-auto"
          buttonType="iconBtn"
          onClick={setEditing}
          disabled={isEditing}
        >
          <AiOutlineEdit />
        </Button>
      </div>
      <UserForm disabled={!isEditing} onSubmitSuccess={setSuccess} />
    </>
  );
};

export default Account;
