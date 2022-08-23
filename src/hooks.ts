import { useEffect, useState } from "react";

export const useOutsideClickEffect = (callback: () => void, deps: any[]) => {
  useEffect(() => {
    document.body.addEventListener("click", callback);
    return () => {
      document.body.removeEventListener("click", callback);
    };
  }, [...deps]);
};

export const useControlledInput = (
  value?: number | string | readonly string[] | undefined,
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

  return [inputValue, handleInputChange] as [
    number | string | readonly string[] | undefined,
    React.ChangeEventHandler<HTMLInputElement>
  ];
};
