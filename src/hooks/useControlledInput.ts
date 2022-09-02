import { useState } from "react";

export const useControlledInput = (
  value?: number | string | readonly string[],
  onChange?: React.ChangeEventHandler<HTMLInputElement>
) => {
  const [inputValue, setInputValue] = useState<
    number | string | readonly string[] | undefined
  >(value);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (onChange) {
      onChange(event);
    }
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    handleInputChange,
  };
};
