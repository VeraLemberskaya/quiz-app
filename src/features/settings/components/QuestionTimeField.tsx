import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { BiError } from "react-icons/bi";

import NumberField from "../../../components/UI/NumberField";
import { useAppSelector } from "../../../store/hooks";
import { useQuestionTimeFieldValidation } from "../hooks/useQuestionTimeFieldValidation";
import { selectQuestionTime } from "../services/selectors";
import { SettingsValues } from "../services/types";

import SettingsController from "./SettingsController";

type Props = {
  control: Control<SettingsValues, object>;
};

const QuestionTimeField: FC<Props> = ({ control }) => {
  const questionTime = useAppSelector(selectQuestionTime);
  const rules = useQuestionTimeFieldValidation();

  return (
    <SettingsController
      label="Question time:"
      control={
        <div>
          <Controller
            control={control}
            name="questionTime"
            defaultValue={questionTime}
            render={({
              field: { onChange, ref, value },
              fieldState: { error },
            }) => (
              <NumberField
                value={value}
                step={10}
                error={error?.message}
                errorIcon={<BiError />}
                onChange={(event) => {
                  onChange(Number(event.target.value));
                }}
                ref={ref}
              />
            )}
            rules={rules}
          />
        </div>
      }
    />
  );
};

export default QuestionTimeField;
