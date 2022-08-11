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
        className={classNames(styles.answersContainer, {
          [styles.gridFourCol]: childrenCount === 4,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default AnswersContainer;
