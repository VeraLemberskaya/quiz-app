import classNames from "classnames";
import { FC } from "react";

import styles from "../card.module.scss";

type ImageType = "top" | "bottom";

type Props = {
  src: string;
  alt: string;
  variant: ImageType;
};

const IMAGE_TYPES: { [key in ImageType]: string } = {
  top: styles.cardImageTop,
  bottom: styles.cardImageBottom,
};

const Image: FC<Props> = ({ src, alt, variant }) => {
  return (
    <img
      className={classNames(styles.cardImage, IMAGE_TYPES[variant])}
      src={src}
      alt={alt}
    />
  );
};

export default Image;
