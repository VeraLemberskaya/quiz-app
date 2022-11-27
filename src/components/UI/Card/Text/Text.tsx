import { FC } from "react";

import styles from "../card.module.scss";

type Props = {
  children: React.ReactNode;
};

const Text: FC<Props> = ({ children }) => {
  return <p className={styles.cardText}>{children}</p>;
};

export default Text;
