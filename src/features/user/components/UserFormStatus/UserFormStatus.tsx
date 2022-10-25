import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import Button from "../../../../components/UI/Button";
import { useEditStatus } from "../../hooks/useEditStatus";

const UserFormStatus: FC = () => {
  const { message, setEditing, isEditing } = useEditStatus();

  return (
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
  );
};

export default UserFormStatus;
