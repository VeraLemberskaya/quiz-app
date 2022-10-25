import { useContext } from "react";

import EditStatusContext from "../contexts/EditStatusContext";

export const useEditStatus = () => useContext(EditStatusContext);
