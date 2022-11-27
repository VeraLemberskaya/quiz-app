import { FC } from "react";

import styles from "../card.module.scss";

type Props = {
  children: React.ReactNode;
};

const Body: FC<Props> = ({ children }) => {
  return <div className={styles.cardBody}>{children}</div>;
};

export default Body;
