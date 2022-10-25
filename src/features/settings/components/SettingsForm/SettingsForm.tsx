import { isEmpty, isEqual } from "lodash";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../../../components/UI/Button";
import { useAppSelector } from "../../../../store/hooks";
import { selectCurrentSettings } from "../../services/selectors";
import { useSaveSettingsMutation } from "../../services/slice";
import { SettingsValues } from "../../services/types";
import AnswerAmountField from "../AnswerAmountField";
import QuestionAmountField from "../QuestionAmountField";
import QuestionTimeField from "../QuestionTimeField";
import TopicsField from "../TopicsField";

import styles from "./settingsForm.module.scss";

export type FieldNames = keyof SettingsValues;

const SettingsForm: FC = () => {
  const currentSettings = useAppSelector(selectCurrentSettings);
  const [saveSettings] = useSaveSettingsMutation();

  const { reset, control, watch, handleSubmit } = useForm<SettingsValues>({
    mode: "onChange",
  });

  const watchFormValue = watch();

  const handleFormSubmit: SubmitHandler<SettingsValues> = (data) => {
    saveSettings(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <TopicsField control={control} />
      <QuestionAmountField control={control} />
      <AnswerAmountField control={control} />
      <QuestionTimeField control={control} />
      <div className={`${styles.btnContainer} d-flex mt-5`}>
        <Button
          className="me-5"
          buttonType="primary"
          buttonSize="large"
          disabled={
            isEmpty(watchFormValue) || isEqual(watchFormValue, currentSettings)
          }
        >
          Save
        </Button>
        <Button
          type="button"
          buttonType="outlined"
          buttonSize="large"
          disabled={
            isEmpty(watchFormValue) || isEqual(watchFormValue, currentSettings)
          }
          onClick={() => reset()}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
