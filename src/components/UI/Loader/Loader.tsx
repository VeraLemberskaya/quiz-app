import { FC } from "react";
import { BeatLoader } from "react-spinners";

import styles from "./loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <BeatLoader color="#2fa3ba" loading={true} />
    </div>
  );
};

export default Loader;
