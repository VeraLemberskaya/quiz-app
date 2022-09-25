import { FC } from "react";
import { Control } from "react-hook-form";
import { useAppSelector } from "../../../services/hooks";
import {
  selectCurrentSettings,
  selectQuestionAmountValues,
} from "../services/selectors";
import { SettingsValues } from "../services/types";
import SettingDropdown from "./SettingDropdown";
import SettingsController from "./SettingsController";

type Props = {
  control: Control<SettingsValues, object>;
};

const QuestionAmountField: FC<Props> = ({ control }) => {
  const questionAmountValues = useAppSelector(selectQuestionAmountValues);
  const { questionAmount: currentQuestionAmount } = useAppSelector(
    selectCurrentSettings
  );
  return (
    <SettingsController
      label="Question amount:"
      control={
        <SettingDropdown
          defaultValue={currentQuestionAmount}
          options={questionAmountValues.map((val) => val.value)}
          control={control}
          name="questionAmount"
        />
      }
    />
  );
};

export default QuestionAmountField;
