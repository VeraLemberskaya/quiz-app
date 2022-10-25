import { createContext } from "react";

type EditStatusContextType = {
  isEditing: boolean;
  message: string;
  setSuccess: () => void;
  setEditing: () => void;
};

const initialState: EditStatusContextType = {
  isEditing: false,
  message: "",
  setSuccess: () => {},
  setEditing: () => {},
};

const EditStatusContext = createContext<EditStatusContextType>(initialState);

export default EditStatusContext;
