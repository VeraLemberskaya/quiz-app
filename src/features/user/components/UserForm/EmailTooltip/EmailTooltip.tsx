import { FC } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import Tooltip from "../../../../../components/UI/Tooltip";
import Icon from "../../../../../components/UI/Icon";
import styles from "./emailTooltip.module.scss";

const EmailTooltip: FC = () => {
  return (
    <>
      <Icon
        size="small"
        className={styles.icon}
        icon={<AiOutlineInfoCircle data-tip data-for="tooltip" />}
      />
      <Tooltip id="tooltip" place="left">
        Email field is not editable.
      </Tooltip>
    </>
  );
};

export default EmailTooltip;
