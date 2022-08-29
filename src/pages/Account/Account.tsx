import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "../../components/UI/Button";
import { useAppSelector } from "../../services/hooks";
import FormHeader from "../../features/user/components/FormHeader";
import FormWrapper from "../../features/user/components/FormWrapper";
import UserForm from "../../features/user/components/Account/UserForm";
import { useEditStatus } from "../../features/user/hooks/useEditStatus";
import { selectCurrentUser } from "../../features/user/services/selectors";

import styles from "./account.module.scss";

const Account: FC = () => {
  const { setEditStatus, message, isEditing } = useEditStatus();
  const user = useAppSelector(selectCurrentUser);

  return (
    <FormWrapper>
      <FormHeader message={`Hello, ${user?.name} ${user?.surname}`} />
      <div>
        <div
          className={`${styles.editRow} d-flex align-items-center w-100 mb-1`}
        >
          {message}
          <Button
            className="ms-auto"
            buttonType="iconBtn"
            onClick={() => {
              setEditStatus("editing");
            }}
            disabled={isEditing}
          >
            <AiOutlineEdit />
          </Button>
        </div>
        <UserForm
          disabled={!isEditing}
          onSubmit={() => setEditStatus("success")}
        />
      </div>
    </FormWrapper>
  );
};

export default Account;
