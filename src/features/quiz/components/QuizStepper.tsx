import { FC } from "react";

import Stepper from "../../../components/UI/Stepper";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCurrentSettings } from "../../settings/services/selectors";
import { useQuizContext } from "../contexts/QuizContext";
import { selectCurrentIndex } from "../services/selectors";
import { setQuestionIndex } from "../services/slice";

const QuizStepper: FC = () => {
  const { questionAmount } = useAppSelector(selectCurrentSettings);
  const currentIndex = useAppSelector(selectCurrentIndex);
  const { resultsViewMode } = useQuizContext();

  const dispatch = useAppDispatch();

  const handleStepChange = (index: number) => {
    dispatch(setQuestionIndex(index));
  };

  return (
    <Stepper
      stepCount={questionAmount}
      activeStep={currentIndex}
      onStepChange={handleStepChange}
      disabled={!resultsViewMode}
    />
  );
};

export default QuizStepper;
