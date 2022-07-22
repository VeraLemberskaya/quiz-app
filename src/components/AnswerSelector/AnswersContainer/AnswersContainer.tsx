import React, { FC } from "react";

import styles from "./answersContainer.module.scss";

type Props = {
  children: React.ReactNode;
};

const AnswersContainer: FC<Props> = ({ children }) => {
  return (
    <div className="container">
      <div className={`${styles.answersContainer} row`}>{children}</div>
    </div>
  );
};

export default AnswersContainer;
