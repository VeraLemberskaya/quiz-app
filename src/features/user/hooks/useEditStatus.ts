import { useState, useMemo, useCallback } from "react";

type EditStatus = "editing" | "success" | "none";

const STATUS_MESSAGES: { [key in EditStatus]: string } = {
  none: "",
  editing: "Edit your account data.",
  success: "Data have been successfully updated.",
};

export const useEditStatus = () => {
  const [editStatus, setEditStatus] = useState<EditStatus>("none");

  const message = useMemo(() => STATUS_MESSAGES[editStatus], [editStatus]);

  const isEditing = useMemo(() => editStatus === "editing", [editStatus]);

  const setEditing = useCallback(() => {
    setEditStatus("editing");
  }, [setEditStatus]);

  const setSuccess = useCallback(() => {
    setEditStatus("success");
  }, [setEditStatus]);

  return {
    setSuccess,
    setEditing,
    message,
    isEditing,
  };
};
