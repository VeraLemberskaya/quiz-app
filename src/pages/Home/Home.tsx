import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

import Image from "../../assets/images/people-quiz.svg";

import Button from "../../components/UI/Button";
import FadeTransition from "../../components/Utils/FadeTransition";
import TopicsModal from "../../features/quiz/components/TopicsModal";

import styles from "./home.module.scss";

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
        <img className="w-100" src={Image} alt="quiz" />
      </div>
      <FadeTransition inProp={modalOpened} timeout={300} styles={styles}>
        <TopicsModal onClose={() => setModalOpened(false)} />
      </FadeTransition>
    </div>
  );
};

export default Home;
