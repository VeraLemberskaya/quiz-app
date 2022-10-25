import { FC } from "react";
import { useController } from "react-hook-form";

import Checkbox from "../UI/Checkbox";

type Props = {
  label?: string;
  control: any;
  name: string;
};

const CheckboxControl: FC<Props> = ({ name, label, control }) => {
  const { field } = useController({
    name,
    control,
  });

  return <Checkbox label={label} {...field} checked={field.value} />;
};

export default CheckboxControl;
