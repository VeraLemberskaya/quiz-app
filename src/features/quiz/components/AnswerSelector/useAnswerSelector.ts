import { useContext } from "react";

import { AnswerSelectorContext } from "./AnswerSelectorContext";

export const useAnswerSelectorContext = () => useContext(AnswerSelectorContext);
