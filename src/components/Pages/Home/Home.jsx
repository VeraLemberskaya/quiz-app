import React from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

import { Button } from "../../UI";
import styles from "./home.module.css";
import Image from "../../../assets/people-quiz.svg";

const Home = () => {
  return (
    <div
      className={`${styles.HomeContainer} container d-flex justify-content-between}`}
    >
      <div className={styles.Info}>
        <h1 className={styles.H1}>
          Learn
          <br />
          new concepts
          <br />
          for each question
        </h1>
        <h3 className={`${styles.H3} py-2 my-5`}>
          We help you prepare for exams and quizes
        </h3>
        <div className={`${styles.BtnContainer} d-flex`}>
          <Link to="/">
            <Button type="primary" size="large">
              Start solving
            </Button>
          </Link>
          <Link to="/">
            <Button size="large" startIcon={<AiFillCaretDown />}>
              know more
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.Image}>
        <img className="w-100" src={Image} />
      </div>
    </div>
  );
};

export default Home;
