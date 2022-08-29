import { FC } from "react";
import { useFormContext, useController, FieldError } from "react-hook-form";
import { BiError } from "react-icons/bi";
import TextField from "../../../components/UI/TextField";
import { useEmailValidation } from "../hooks/useEmailValidation";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { useUserNameValidation } from "../hooks/useUserNameValidation";

type FieldFeatures = {
  placeholder: string;
  type?: "text" | "password";
  useValidation: (
    name: string,
    error?: FieldError,
    rules?: {
      onBlur?: () => void;
      onChange?: () => void;
    }
  ) => object;
};

type FieldType = "password" | "email" | "name";

const FIELD_OPTIONS: Record<FieldType, FieldFeatures> = {
  password: {
    placeholder: "Password",
    type: "password",
    useValidation: usePasswordValidation,
  },
  email: {
    placeholder: "Email Address",
    type: "text",
    useValidation: useEmailValidation,
  },
  name: {
    placeholder: "Name",
    type: "text",
    useValidation: useUserNameValidation,
  },
};

type Props = {
  name: string;
  type: FieldType;
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  placeholder?: string;
  rules?: {
    onBlur?: () => void;
    onChange?: () => void;
  };
};

const FormField: FC<Props> = ({
  name,
  type,
  defaultValue,
  disabled,
  placeholder,
  rules,
}) => {
  const { register, control } = useFormContext();

  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const {
    useValidation,
    placeholder: fieldPlaceholder,
    ...fieldProps
  } = FIELD_OPTIONS[type];

  const fieldRules = useValidation(name, error, rules);

  return (
    <TextField
      defaultValue={defaultValue}
      placeholder={placeholder ?? fieldPlaceholder}
      {...fieldProps}
      {...register(name, fieldRules)}
      errorIcon={<BiError />}
      error={error?.message}
      disabled={disabled}
    />
  );
};

export default FormField;
