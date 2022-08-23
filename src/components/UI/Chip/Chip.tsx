import classNames from "classnames";
import { FC } from "react";
import { IoMdCloseCircle } from "react-icons/io";

import styles from "./chip.module.scss";

type ChipiColor = "primary" | "default";
type ChipSize = "large" | "default";

type Props = {
  label: string;
  color?: ChipiColor;
  size?: ChipSize;
  onDelete?: () => void;
  onClick?: () => void;
};

const CHIP_TYPES: { [key in ChipiColor]: string } = {
  primary: styles.primary,
  default: styles.default,
};

const Chip: FC<Props> = ({
  label,
  color = "default",
  size = "default",
  onDelete,
  onClick,
}) => {
  const handleDelete: React.MouseEventHandler<SVGElement> = (event) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };
  return (
    <div
      className={classNames(styles.chip, CHIP_TYPES[color], {
        [styles.pointer]: onClick,
        [styles.large]: size === "large",
      })}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {onDelete && <IoMdCloseCircle onClick={handleDelete} />}
    </div>
  );
};

export default Chip;
