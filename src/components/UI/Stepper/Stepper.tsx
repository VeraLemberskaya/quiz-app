import React, { FC } from "react";
import Step from "./Step";

import styles from "./stepper.module.scss";

type Props = {
  stepsCount: number;
  activeStep: number;
};

const Stepper: FC<Props> = ({ stepsCount, activeStep }) => {
  const makeSteps = () => {
    const steps = [];
    for (let index = 1; index <= stepsCount; index++) {
      steps.push(index);
    }
    return (
      <div className={styles.stepperContainer}>
        {steps.map((step) => (
          <Step>{step}</Step>
        ))}
      </div>
    );
  };

  return <div className="container">{makeSteps()}</div>;
};

export default Stepper;
