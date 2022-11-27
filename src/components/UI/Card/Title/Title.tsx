import { FC } from "react";

import styles from "../card.module.scss";

type Props = {
  children: React.ReactNode;
};

const Title: FC<Props> = ({ children }) => {
  return <h3 className={styles.cardTitle}>{children}</h3>;
};

export default Title;
