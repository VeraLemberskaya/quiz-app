import { FC } from "react";
import Dropdown from "../../../UI/Dropdown";

import styles from "./settingDropdown.module.scss";

type Props = {
  label: string;
  currentSetting: number | string;
  settingsValues: number[] | string[];
  onSettingSelect: (value: any) => void;
};

const SettingDropdown: FC<Props> = ({
  label,
  currentSetting,
  settingsValues,
  onSettingSelect,
}) => {
  return (
    <div className={styles.settingContainer}>
      <h6>{label}</h6>
      <Dropdown>
        <Dropdown.Toggle>{currentSetting}</Dropdown.Toggle>
        <Dropdown.Menu>
          {settingsValues.map((value) => (
            <Dropdown.Item key={value} onClick={() => onSettingSelect(value)}>
              {value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SettingDropdown;
