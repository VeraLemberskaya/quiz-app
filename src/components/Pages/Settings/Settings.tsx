import { FC, useEffect, useState, useRef } from "react";
import { Settings } from "../../../redux/settings/types";
import isEqual from "lodash/isEqual";

import styles from "./settings.module.scss";
import Button from "../../UI/Button";
import Loader from "../../UI/Loader";
import PageTitle from "../../UI/PageTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  deleteTopic,
  initSettings,
  saveSettings,
  setAnswerAmount,
  setQuestionAmount,
  setTopic,
} from "../../../redux/settings/slice";
import {
  selectCurrentSettings,
  selectSettingsValues,
} from "../../../redux/settings/selectors";
import SettingDropdown from "./SettingDropdown";
import SettingChipList from "./SettingsChipList";

const SettingsPage: FC = () => {
  const { status, ...settings } = useAppSelector(selectSettingsValues);
  const currentSettings = useAppSelector(selectCurrentSettings);
  const [oldSettings, setOldSettings] = useState<Settings | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initSettings());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      setOldSettings(settings);
    }
  }, [status]);

  const handleTopicDelete = (topic: string) => {
    dispatch(deleteTopic(topic));
  };

  const handleTopicSelect = (topic: string) => {
    dispatch(setTopic(topic));
  };

  const handleQuestionAmountSelect = (value: number) => {
    dispatch(setQuestionAmount(value));
  };

  const handleAnswerAmountSelect = (value: number) => {
    dispatch(setAnswerAmount(value));
  };

  const handleSaveBtnClick = async () => {
    dispatch(saveSettings());
  };

  const handleBtnResetClick = () => {
    dispatch(initSettings());
  };

  return status === "loading" ? (
    <Loader />
  ) : (
    <div className={`${styles.settingsBody} container`}>
      <PageTitle>Settings</PageTitle>
      <h4 className={styles.subtitle}>Configure App settings.</h4>
      <div className={styles.settingsPanel}>
        <div className={styles.settingsContainer}>
          <div>
            <SettingChipList
              label="Quiz topics:"
              selectedItems={currentSettings.topics.map((topic) => topic.name)}
              items={settings.topics
                .filter((topic) => !topic.selected)
                .map((topic) => topic.name)}
              onItemDelete={handleTopicDelete}
              onItemSelect={handleTopicSelect}
            />
          </div>
          <SettingDropdown
            label="Question amount:"
            currentSetting={currentSettings.questionAmount}
            settingsValues={settings.questionAmountValues.map(
              (val) => val.value
            )}
            onSettingSelect={handleQuestionAmountSelect}
          />
          <SettingDropdown
            label="Answers amount:"
            currentSetting={currentSettings.answerAmount}
            settingsValues={settings.answerAmountValues.map((val) => val.value)}
            onSettingSelect={handleAnswerAmountSelect}
          />
        </div>
        <div className={`${styles.btnContainer} d-flex mt-5`}>
          <Button
            className="me-5"
            buttonType="primary"
            buttonSize="large"
            onClick={handleSaveBtnClick}
            disabled={isEqual(oldSettings, settings)}
          >
            Save
          </Button>
          <Button
            buttonType="outlined"
            buttonSize="large"
            onClick={handleBtnResetClick}
            disabled={isEqual(oldSettings, settings)}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
