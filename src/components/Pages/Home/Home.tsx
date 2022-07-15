import React from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

import { Button } from "../../UI";
import styles from "./home.module.scss";
import Image from "../../../assets/people-quiz.svg";

const Home: React.FC = () => {
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
          <Link to="/">
            <Button type="primary" buttonSize="large">
              Start solving
            </Button>
          </Link>
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
    </div>
  );
};

export default Home;
