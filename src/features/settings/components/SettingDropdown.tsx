import { FC } from "react";
import Dropdown from "../../../components/UI/Dropdown";
import { Control, useController } from "react-hook-form";

import { SettingsValues } from "../services/types";
import { FieldNames } from "./SettingsForm/SettingsForm";

type Props = {
  defaultValue?: number;
  options: number[];
  name: FieldNames;
  control: Control<SettingsValues, object>;
};

const SettingDropdown: FC<Props> = ({
  defaultValue,
  options,
  control,
  name,
}) => {
  const {
    field: { onChange, value },
  } = useController({ name, control, defaultValue });

  return (
    <Dropdown>
      <Dropdown.Toggle>{value}</Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item key={option} onClick={() => onChange(option)}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SettingDropdown;
