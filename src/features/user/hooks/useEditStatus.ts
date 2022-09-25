import { useState, useMemo } from "react";

type EditStatus = "editing" | "success" | "none";

const STATUS_MESSAGES: { [key in EditStatus]: string } = {
  none: "",
  editing: "Edit your personal data.",
  success: "Data have been successfully updated.",
};

export const useEditStatus = () => {
  const [editStatus, setEditStatus] = useState<EditStatus>("none");

  const message = useMemo(() => STATUS_MESSAGES[editStatus], [editStatus]);

  const isEditing = useMemo(() => editStatus === "editing", [editStatus]);

  return {
    setEditStatus,
    message,
    isEditing,
  };
};
