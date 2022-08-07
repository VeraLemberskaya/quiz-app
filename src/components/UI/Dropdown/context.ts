import { createContext, useContext } from "react";

export type DropdownContextType = {
  isOpened: boolean;
  toggleOpened: () => void;
};

export const DropdownContext = createContext<DropdownContextType>({
  isOpened: false,
  toggleOpened: () => {},
});

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "Compound components should be used only inside parent component."
    );
  }
  return context;
};
