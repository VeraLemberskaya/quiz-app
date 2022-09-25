import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

import styles from "./formHeader.module.scss";
import Logo from "../../../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/UI/Button";

type Props = {
  message: string;
};

const FormHeader: FC<Props> = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.formHeader}>
      <Button
        buttonType="iconBtn"
        onClick={() => navigate(-1)}
        className="position-absolute top-0 start-0 mt-2 ms-2"
      >
        <BiArrowBack />
      </Button>
      <img className={styles.logo} src={Logo} alt="QuizGrad" />
      <h4 className={styles.message}>{message}</h4>
    </div>
  );
};

export default FormHeader;
