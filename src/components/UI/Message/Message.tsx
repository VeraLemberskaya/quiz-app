import { FC } from "react";
import classNames from "classnames";

import styles from "./message.module.scss";

type MessageType = "success" | "error";

type Props = {
  type: MessageType;
  text?: string;
};

const Message: FC<Props> = ({ type, text = "" }) => {
  return (
    <div
      className={classNames(styles.messageWrapper, {
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      {text}
    </div>
  );
};

export default Message;
