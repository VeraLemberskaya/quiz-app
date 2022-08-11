import classNames from "classnames";
import React, { Children, FC } from "react";

import styles from "./answersContainer.module.scss";

type Props = {
  children: React.ReactNode;
};

const AnswersContainer: FC<Props> = ({ children }) => {
  const childrenCount = Children.count(children);

  return (
    <div className="container">
      <div
        className={classNames(
          styles.answersContainer,
          childrenCount === 4 && styles.gridFourCol
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AnswersContainer;
