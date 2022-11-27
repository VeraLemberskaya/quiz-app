import { FC } from "react";

import styles from "../card.module.scss";

type Props = {
  children: React.ReactNode;
};

const Actions: FC<Props> = ({ children }) => {
  return <div className={styles.cardActions}>{children}</div>;
};

export default Actions;
