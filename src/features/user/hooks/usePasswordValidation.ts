import { FieldError, useFormContext } from "react-hook-form";

export const usePasswordValidation = (
  name: string,
  error?: FieldError,
  rules?: {
    onBlur?: () => void;
    onChange?: () => void;
  }
) => {
  const { setError } = useFormContext();

  return {
    onChange() {
      if (rules?.onChange) {
        rules.onChange();
      }
    },
    onBlur() {
      if (error?.type === "minLength") {
        setError(name, {
          type: "blya",
          message: "Password should contain 6 or more characters.",
        });
      }
      if (rules?.onBlur) {
        rules.onBlur();
      }
    },
    required: "Field is required.",
    minLength: 6,
  };
};
