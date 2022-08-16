import { FC, ReactNode } from "react";

import styles from "./formWrapper.module.scss";

type Props = {
  children: ReactNode;
};

const FormWrapper: FC<Props> = ({ children }) => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default FormWrapper;
