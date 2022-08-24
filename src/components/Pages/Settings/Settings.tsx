import { FC } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import styles from "./settings.module.scss";
import Button from "../../UI/Button";
import Loader from "../../UI/Loader";
import PageTitle from "../../UI/PageTitle";
import { useAppSelector } from "../../../redux/hooks";
import SettingDropdown from "./SettingDropdown";
import SettingChipList from "./SettingsChipList";
import NumberField from "../../UI/NumberField";
import { BiError } from "react-icons/bi";
import {
  useGetSettingsQuery,
  useSaveSettingsMutation,
} from "../../../redux/settings/slice";
import { selectCurrentSettings } from "../../../redux/settings/selectors";
import { SettingsValues } from "../../../redux/settings/types";

export type FieldNames = keyof SettingsValues;

const SettingsPage: FC = () => {
  const {
    data: settings,
    isLoading,
    isSuccess,
    refetch,
  } = useGetSettingsQuery();
  const [saveSettings, { isLoading: isUpdating }] = useSaveSettingsMutation();
  const currentSettings = useAppSelector(selectCurrentSettings);

  const {
    reset,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsValues>({ mode: "onChange" });

  const watchFormValue = watch();

  const handleFormSubmit: SubmitHandler<SettingsValues> = (
    data: SettingsValues
  ) => {
    saveSettings(data);
    refetch();
  };

  return isLoading || isUpdating ? (
    <Loader />
  ) : (
    <>
      {isSuccess && (
        <div className={`${styles.settingsBody} container`}>
          <PageTitle>Settings</PageTitle>
          <h4 className={styles.subtitle}>Configure App settings.</h4>
          <div className={styles.settingsPanel}>
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div>
                <SettingChipList
                  label="Quiz topics:"
                  options={settings.topics.map((topic) => topic.name)}
                  defaultValue={currentSettings.topics}
                  name="topics"
                  control={control}
                />
              </div>
              <SettingDropdown
                label="Question amount:"
                defaultValue={currentSettings.questionAmount}
                options={settings.questionAmountValues.map((val) => val.value)}
                control={control}
                name="questionAmount"
              />
              <SettingDropdown
                label="Answers amount:"
                defaultValue={currentSettings.answerAmount}
                options={settings.answerAmountValues.map((val) => val.value)}
                control={control}
                name="answerAmount"
              />
              <div className="d-flex align-items-end">
                <h6>Question time:</h6>
                <div className={styles.numberFieldContainer}>
                  <Controller
                    control={control}
                    name="questionTime"
                    defaultValue={settings.questionTime}
                    render={({ field: { onChange, ref, value } }) => (
                      <NumberField
                        value={value}
                        step={10}
                        error={errors.questionTime?.message}
                        errorIcon={<BiError />}
                        onChange={(event) => {
                          onChange(Number(event.target.value));
                        }}
                        ref={ref}
                      />
                    )}
                    rules={{
                      required: "Field is required",
                      min: {
                        value: 5,
                        message:
                          "Question time should be greater than or equal to 5.",
                      },
                      max: {
                        value: 60,
                        message:
                          "Question time should be less than or equal to 60.",
                      },
                    }}
                  />
                </div>
              </div>
              <div className={`${styles.btnContainer} d-flex mt-5`}>
                <Button
                  className="me-5"
                  buttonType="primary"
                  buttonSize="large"
                  disabled={
                    isEmpty(watchFormValue) ||
                    isEqual(watchFormValue, currentSettings)
                  }
                >
                  Save
                </Button>
                <Button
                  type="button"
                  buttonType="outlined"
                  buttonSize="large"
                  disabled={
                    isEmpty(watchFormValue) ||
                    isEqual(watchFormValue, currentSettings)
                  }
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
