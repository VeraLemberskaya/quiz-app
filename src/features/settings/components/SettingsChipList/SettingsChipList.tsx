import { FC, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Control, useController } from "react-hook-form";

import styles from "./settingsChipList.module.scss";
import { SettingsValues } from "../../services/types";
import Chip from "../../../../components/UI/Chip";
import { useOptions } from "../../hooks/useOptions";
import { FieldNames } from "../SettingsForm/SettingsForm";

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
  const {
    selectedOptions,
    unselectedOptions,
    handleOptionDelete,
    handleOptionSelect,
  } = useOptions(defaultValue, options);

  const {
    field: { onChange },
  } = useController({ name, control, defaultValue });

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div>
      <div className={styles.settingWrapper}>
        <h6>{label}</h6>
        {selectedOptions?.map((option) => (
          <Chip
            key={option}
            label={option}
            color="primary"
            onDelete={() => handleOptionDelete(option)}
          />
        ))}
      </div>
      <CSSTransition
        in={!!unselectedOptions.length}
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
          {unselectedOptions?.map((option) => (
            <Chip
              key={option}
              label={option}
              onClick={() => handleOptionSelect(option)}
            />
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default SettingsChipList;
