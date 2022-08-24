import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";

import Button from "../../UI/Button";
import styles from "./home.module.scss";
import Image from "../../../assets/people-quiz.svg";
import FadeTransition from "../../Utils/FadeTransition";
import TopicModal from "./TopicModal";
import Modal from "../../UI/Modal";

const Home: FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  return (
    <div
      className={`${styles.homeContainer} container d-flex justify-content-between}`}
    >
      <div className={styles.info}>
        <h1 className={styles.title}>
          Learn
          <br />
          new concepts
          <br />
          for each question
        </h1>
        <h3 className={`${styles.subtitle} py-2 my-5`}>
          We help you prepare for exams and quizes
        </h3>
        <div className={`${styles.btnContainer} d-flex`}>
          <Button
            buttonType="primary"
            buttonSize="large"
            onClick={() => setModalOpened(true)}
          >
            Start solving
          </Button>
          <Link to="/">
            <Button buttonSize="large" startIcon={<AiFillCaretDown />}>
              know more
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.image}>
        <img className="w-100" src={Image} />
      </div>
      <FadeTransition inProp={modalOpened} timeout={300} styles={styles}>
        <Modal onClose={() => setModalOpened(false)}>
          <TopicModal />
        </Modal>
      </FadeTransition>
    </div>
  );
};

export default Home;
