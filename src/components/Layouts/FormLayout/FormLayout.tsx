import { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from "./formLayout.module.scss";

const FormLayout: FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};

export default FormLayout;
