import classNames from "classnames";
import { FC } from "react";

import styles from "./icon.module.scss";

type IconType = "default" | "primary" | "secondary" | "error" | "success";
type IconSize = "small" | "medium" | "large";

type Props = {
  type?: IconType;
  size?: IconSize;
  className?: string;
  icon: React.ReactNode;
};

const ICON_TYPES: { [key in IconType]: string } = {
  default: styles.default,
  primary: styles.primary,
  secondary: styles.secondary,
  error: styles.error,
  success: styles.success,
};

const ICON_SIZES: { [key in IconSize]: string } = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const Icon: FC<Props> = ({
  type = "default",
  size = "medium",
  icon,
  className,
}) => {
  return (
    <span
      className={classNames(
        className,
        styles.icon,
        ICON_TYPES[type],
        ICON_SIZES[size]
      )}
    >
      {icon}
    </span>
  );
};

export default Icon;
