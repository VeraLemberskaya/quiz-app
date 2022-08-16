import classNames from "classnames";
import { FC } from "react";
import { IoMdCloseCircle } from "react-icons/io";

import styles from "./chip.module.scss";

type ChipiColor = "primary" | "default";

type Props = {
  label: string;
  color?: ChipiColor;
  onDelete?: () => void;
  onClick?: () => void;
};

const CHIP_TYPES: { [key in ChipiColor]: string } = {
  primary: styles.primary,
  default: styles.default,
};

const Chip: FC<Props> = ({ label, color = "default", onDelete, onClick }) => {
  return (
    <div
      className={classNames(styles.chip, CHIP_TYPES[color], {
        [styles.pointer]: onClick,
      })}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {onDelete && <IoMdCloseCircle onClick={onDelete} />}
    </div>
  );
};

export default Chip;
