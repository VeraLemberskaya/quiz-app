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
    for (let index = 0; index < stepsCount; index++) {
      steps.push(
        <Step
          key={index}
          hasConnector={!!steps.length}
          isActive={index <= activeStep}
        >
          {index + 1}
        </Step>
      );
    }
    return steps;
  };

  return (
    <div className="container">
      <div className={styles.stepperContainer}>{makeSteps()}</div>
    </div>
  );
};

export default Stepper;
