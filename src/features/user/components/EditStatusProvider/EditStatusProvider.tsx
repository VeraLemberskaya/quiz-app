import { FC, useCallback, useMemo, useState } from "react";

import EditStatusContext from "../../contexts/EditStatusContext";

type EditStatus = "editing" | "success" | "none";

const STATUS_MESSAGES: { [key in EditStatus]: string } = {
  none: "",
  editing: "Edit your account data.",
  success: "Data have been successfully updated.",
};

type Props = {
  children: React.ReactNode;
};

const EditStatusProvider: FC<Props> = ({ children }) => {
  const [editStatus, setEditStatus] = useState<EditStatus>("none");

  const message = useMemo(() => STATUS_MESSAGES[editStatus], [editStatus]);

  const isEditing = useMemo(() => editStatus === "editing", [editStatus]);

  const setEditing = useCallback(() => {
    setEditStatus("editing");
  }, [setEditStatus]);

  const setSuccess = useCallback(() => {
    setEditStatus("success");
  }, [setEditStatus]);

  const contextValue = {
    isEditing,
    message,
    setEditing,
    setSuccess,
  };

  return (
    <EditStatusContext.Provider value={contextValue}>
      {children}
    </EditStatusContext.Provider>
  );
};

export default EditStatusProvider;
