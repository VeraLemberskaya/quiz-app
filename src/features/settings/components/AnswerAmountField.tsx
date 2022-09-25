import { FC } from "react";
import { Control } from "react-hook-form";

import { useAppSelector } from "../../../services/hooks";
import {
  selectAnswerAmountValues,
  selectCurrentSettings,
} from "../services/selectors";
import { SettingsValues } from "../services/types";
import SettingDropdown from "./SettingDropdown";
import SettingsController from "./SettingsController";

type Props = {
  control: Control<SettingsValues, object>;
};

const AnswerAmountField: FC<Props> = ({ control }) => {
  const answerAmountValues = useAppSelector(selectAnswerAmountValues);
  const { answerAmount: currentAnswerAmount } = useAppSelector(
    selectCurrentSettings
  );
  return (
    <SettingsController
      label="Answers amount:"
      control={
        <SettingDropdown
          defaultValue={currentAnswerAmount}
          options={answerAmountValues.map((val) => val.value)}
          control={control}
          name="answerAmount"
        />
      }
    />
  );
};

export default AnswerAmountField;
