import { FC } from "react";

import styles from "./infoBlock.module.scss";

type Props = {
  label: string;
  icon?: JSX.Element;
};

const InfoBlock: FC<Props> = ({ label, icon }) => {
  return (
    <div className={styles.blockWrapper}>
      <span>{label}</span>
      {icon && icon}
    </div>
  );
};

export default InfoBlock;
