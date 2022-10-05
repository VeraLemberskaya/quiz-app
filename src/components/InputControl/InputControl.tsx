import { FC } from "react";
import { useController } from "react-hook-form";
import { BiError } from "react-icons/bi";
import ErrorDisplay from "../UI/ErrorDisplay";
import TextField from "../UI/TextField";

type Props = {
  label?: string;
  placeholder?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  type?: "text" | "password";
  control: any;
};

const InputControl: FC<Props> = ({
  control,
  type,
  label,
  placeholder,
  name,
  defaultValue,
  disabled,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      <TextField
        type={type}
        defaultValue={defaultValue}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        error={!!error}
        {...field}
      />
      <ErrorDisplay
        message={error?.message}
        icon={<BiError />}
        visible={!!error}
      />
    </div>
  );
};

export default InputControl;
