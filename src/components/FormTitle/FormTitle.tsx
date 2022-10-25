import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";
import Button from "../UI/Button";

import styles from "./formTitle.module.scss";

type Props = {
  children: string;
};

const FormTitle: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.formTitle}>
      <Button
        buttonType="iconBtn"
        onClick={() => navigate(-1)}
        className="position-absolute top-0 start-0 mt-2 ms-2"
      >
        <BiArrowBack />
      </Button>
      <img className={styles.logo} src={Logo} alt="QuizGrad" />
      <h4 className={styles.message}>{children}</h4>
    </div>
  );
};

export default FormTitle;
