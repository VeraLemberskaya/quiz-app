import { FieldError, useFormContext } from "react-hook-form";

export const useEmailValidation = (name: string, error?: FieldError) => {
  const { setError } = useFormContext();

  return {
    onBlur() {
      if (error?.type === "pattern") {
        setError(name, {
          type: "pattern",
          message: "Please enter correct email.",
        });
      }
    },
    required: "Field is required.",
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  };
};
