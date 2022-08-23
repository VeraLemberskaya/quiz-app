import { FC } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./settingsChipList.module.scss";
import Chip from "../../../UI/Chip";

type Props = {
  label: string;
  selectedItems: string[];
  items: string[];
  onItemSelect: (value: string) => void;
  onItemDelete: (value: string) => void;
};

const SettingsChipList: FC<Props> = ({
  label,
  selectedItems,
  items,
  onItemDelete,
  onItemSelect,
}) => {
  return (
    <>
      <div className={styles.settingWrapper}>
        <h6>{label}</h6>
        {selectedItems?.map((item) => (
          <Chip
            key={item}
            label={item}
            color="primary"
            onDelete={() => onItemDelete(item)}
          />
        ))}
      </div>
      <CSSTransition
        in={!!items.length}
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
          {items?.map((item) => (
            <Chip label={item} onClick={() => onItemSelect(item)} />
          ))}
        </div>
      </CSSTransition>
    </>
  );
};

export default SettingsChipList;
