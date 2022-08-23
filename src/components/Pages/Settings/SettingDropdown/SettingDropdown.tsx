import { FC } from "react";
import Dropdown from "../../../UI/Dropdown";
import { Control, useController } from "react-hook-form";

import styles from "./settingDropdown.module.scss";
import { FieldNames } from "../Settings";
import { SettingsValues } from "../../../../redux/settings/types";

type Props = {
  label: string;
  defaultValue?: number;
  options: number[];
  name: FieldNames;
  control: Control<SettingsValues, object>;
};

const SettingDropdown: FC<Props> = ({
  label,
  defaultValue,
  options,
  control,
  name,
}) => {
  const {
    field: { onChange, value },
  } = useController({ name, control, defaultValue });

  return (
    <div className={styles.settingContainer}>
      <h6>{label}</h6>
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
    </div>
  );
};

export default SettingDropdown;
