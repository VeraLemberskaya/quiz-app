import { FC } from "react";

import Step from "./Step";

import styles from "./stepper.module.scss";

type Props = {
  stepCount: number;
  activeStep: number;
  disabled: boolean;
  onStepChange: (step: number) => void;
};

const Stepper: FC<Props> = ({
  stepCount,
  activeStep,
  onStepChange,
  disabled,
}) => {
  const makeSteps = () => {
    const steps = [];
    for (let index = 0; index < stepCount; index++) {
      steps.push(
        <Step
          key={index}
          hasConnector={index !== 0}
          isActive={index <= activeStep}
          onSelect={() => {
            onStepChange(index);
          }}
          disabled={disabled}
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
