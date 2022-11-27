import { FC } from "react";

import Stepper from "../../../../components/UI/Stepper";
import { useQuestionIndex } from "../../hooks/useQuestionIndex";
import { useQuiz } from "../../hooks/useQuiz";

const QuizStepper: FC = () => {
  const { questionCount, isResultsMode } = useQuiz();
  const { index, setIndex } = useQuestionIndex();

  const handleStepChange = (index: number) => {
    setIndex(index);
  };

  return (
    <Stepper
      stepCount={questionCount}
      activeStep={index}
      onStepChange={handleStepChange}
      disabled={!isResultsMode}
    />
  );
};

export default QuizStepper;
