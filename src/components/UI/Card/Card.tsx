import classNames from "classnames";

import Image from "./Image";
import Title from "./Title";
import Text from "./Text";
import Body from "./Body";
import Actions from "./Actions";

import styles from "./card.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return <div className={classNames(className, styles.card)}>{children}</div>;
};

export default Card;

Card.Image = Image;
Card.Title = Title;
Card.Text = Text;
Card.Body = Body;
Card.Actions = Actions;
