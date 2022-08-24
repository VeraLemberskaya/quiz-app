import { FC, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Control, useController } from "react-hook-form";

import styles from "./settingsChipList.module.scss";
import Chip from "../../../UI/Chip";
import { FieldNames } from "../Settings";
import { SettingsValues } from "../../../../redux/settings/types";

type Props = {
  label: string;
  defaultValue: string[];
  options: string[];
  name: FieldNames;
  control: Control<SettingsValues, object>;
};

const SettingsChipList: FC<Props> = ({
  label,
  options,
  defaultValue,
  name,
  control,
}) => {
  const [fieldValue, setFieldValue] = useState<string[]>(defaultValue);
  const [optionsValue, setOptionsValue] = useState<string[]>(
    options.filter((option) => !defaultValue.includes(option))
  );

  const {
    field: { onChange },
  } = useController({ name, control, defaultValue });

  useEffect(() => {
    onChange(fieldValue);
  }, [fieldValue]);

  const handleItemDelete = (item: string) => {
    setFieldValue((prevState) => prevState.filter((val) => val !== item));
    setOptionsValue((prevState) => [...prevState, item].sort());
  };

  const handleItemSelect = (item: string) => {
    setOptionsValue((prevState) => prevState.filter((val) => val !== item));
    setFieldValue((prevState) => [...prevState, item].sort());
  };

  return (
    <>
      <div className={styles.settingWrapper}>
        <h6>{label}</h6>
        {fieldValue?.map((item) => (
          <Chip
            key={item}
            label={item}
            color="primary"
            onDelete={() => handleItemDelete(item)}
          />
        ))}
      </div>
      <CSSTransition
        in={!!optionsValue.length}
        timeout={100}
        classNames={{
          enter: styles.accordionEnter,
          enterActive: styles.accordionEnterActive,
          exit: styles.accordionExit,
          exitActive: styles.accordionExitActive,
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.chipList}>
          {optionsValue?.map((item) => (
            <Chip
              key={item}
              label={item}
              onClick={() => handleItemSelect(item)}
            />
          ))}
        </div>
      </CSSTransition>
    </>
  );
};

export default SettingsChipList;
