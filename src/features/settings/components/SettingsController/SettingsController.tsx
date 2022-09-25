import React, { FC } from "react";

import styles from "./settingsController.module.scss";

type Props = {
  label: string;
  control: React.ReactNode;
};

const SettingsController: FC<Props> = ({ label, control }) => {
  return (
    <div className={styles.settingContainer}>
      <h6 className={styles.label}>{label}</h6>
      {control}
    </div>
  );
};

export default SettingsController;
