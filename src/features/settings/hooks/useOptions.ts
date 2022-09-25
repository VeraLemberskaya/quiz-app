import { useState } from "react";

export const useOptions = (defaultValue: string[], options: string[]) => {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultValue);
  const [unselectedOptions, setUnselectedOptions] = useState<string[]>(
    options.filter((option) => !defaultValue.includes(option))
  );

  const handleOptionDelete = (option: string) => {
    setSelectedOptions((prevState) =>
      prevState.filter((val) => val !== option)
    );
    setUnselectedOptions((prevState) => [...prevState, option].sort());
  };

  const handleOptionSelect = (option: string) => {
    setUnselectedOptions((prevState) =>
      prevState.filter((val) => val !== option)
    );
    setSelectedOptions((prevState) => [...prevState, option].sort());
  };

  return {
    selectedOptions,
    unselectedOptions,
    handleOptionDelete,
    handleOptionSelect,
  };
};
