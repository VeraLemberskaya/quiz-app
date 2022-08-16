import React, { FC } from "react";

import styles from "./pagetitle.module.scss";

type Props = {
  children: React.ReactNode;
};

const PageTitle: FC<Props> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default PageTitle;
