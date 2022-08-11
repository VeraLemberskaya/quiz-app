import { FC, useEffect, useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { updateSettings } from "../../../api/requests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectSelectedTopics,
  selectSelectedQuestionAmount,
  selectCurrentSettings,
  selectSelectedAnswerAmount,
} from "../../../redux/settings/selectors";
import {
  initSettings,
  setAnswerAmount,
  setQuestionAmount,
  setTopic,
} from "../../../redux/settings/slice";
import { AmountValue, Topic } from "../../../redux/settings/types";

import { Button, Dropdown, PageTitle } from "../../UI";
import styles from "./settings.module.scss";

const Settings: FC = () => {
  const [themeListOpened, setThemeListOpened] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const { topics, questionAmountValues, answerAmountValues } = useAppSelector(
    selectCurrentSettings
  );
  const selectedTopics = useAppSelector(selectSelectedTopics);
  const selectedQuestionAmount = useAppSelector(selectSelectedQuestionAmount);
  const selectedAnswerAmount = useAppSelector(selectSelectedAnswerAmount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 2000);
    }
  }, [updateSuccess]);

  const handleTopicSelect = (topic: Topic) => {
    dispatch(setTopic(topic));
  };

  const handleQuestionAmountSelect = (value: AmountValue) => {
    dispatch(setQuestionAmount(value));
  };

  const handleAnswerAmountSelect = (value: AmountValue) => {
    dispatch(setAnswerAmount(value));
  };

  const handleResetBtnClick = () => {
    setThemeListOpened(false);
    dispatch(initSettings());
  };

  const handleSaveBtnClick = async () => {
    setThemeListOpened(false);
    const response = await updateSettings({
      topics,
      questionAmountValues,
      answerAmountValues,
    });
    if (response) {
      setUpdateSuccess(true);
    }
  };

  return (
    <div className={`${styles.settingsBody} container`}>
      <PageTitle>Settings</PageTitle>
      <h4 className={styles.subtitle}>Configure App settings.</h4>
      <div className={styles.info}>
        <CSSTransition
          in={updateSuccess}
          timeout={1000}
          classNames={{
            exit: styles.fadeExit,
            exitActive: styles.fadeExitActive,
          }}
          mountOnEnter
          unmountOnExit
        >
          <p>Settings have been successfully updated.</p>
        </CSSTransition>
      </div>
      <div className={styles.settingsPanel}>
        <div className={styles.settingsContainer}>
          <div>
            <div className={styles.topicSettingsWrapper}>
              <h6 className={`${styles.settingTitle} me-4`}>Quiz topics:</h6>
              {selectedTopics.map((topic) => (
                <div
                  key={topic.name}
                  className={`${styles.topicBtn} ${styles.active} ${styles.disabled}`}
                >
                  {topic.name}
                </div>
              ))}
              <Button
                buttonType="iconBtn"
                onClick={() => setThemeListOpened((prevState) => !prevState)}
              >
                <MdPlaylistAdd />
              </Button>
            </div>
            <CSSTransition
              in={themeListOpened}
              timeout={300}
              classNames={{
                enter: styles.accordionEnter,
                enterActive: styles.accordionEnterActive,
                exit: styles.accordionExit,
                exitActive: styles.accordionExitActive,
              }}
              mountOnEnter
              unmountOnExit
            >
              <div className={styles.topicsContainer}>
                {topics.map((topic) => (
                  <div
                    key={topic.name}
                    className={`${styles.topicBtn} ${
                      topic.selected ? styles.active : ""
                    }`}
                    onClick={() => handleTopicSelect(topic)}
                  >
                    {topic.name}
                  </div>
                ))}
              </div>
            </CSSTransition>
          </div>
          <div className="d-flex align-items-end me-5" style={{ zIndex: 1 }}>
            <h6 className={`${styles.settingTitle} me-3`}>Question amount:</h6>
            <Dropdown>
              <Dropdown.Toggle>{selectedQuestionAmount}</Dropdown.Toggle>
              <Dropdown.Menu>
                {questionAmountValues.map((value) => (
                  <Dropdown.Item
                    key={value.value}
                    onClick={() => handleQuestionAmountSelect(value)}
                  >
                    {value.value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex align-items-end">
            <h6 className={`${styles.settingTitle} me-3`}>Answers amount:</h6>
            <Dropdown>
              <Dropdown.Toggle>{selectedAnswerAmount}</Dropdown.Toggle>
              <Dropdown.Menu>
                {answerAmountValues.map((value) => (
                  <Dropdown.Item
                    key={value.value}
                    onClick={() => handleAnswerAmountSelect(value)}
                  >
                    {value.value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={`${styles.btnContainer} d-flex mt-5`}>
          <Button
            className="me-5"
            buttonType="primary"
            buttonSize="large"
            onClick={handleSaveBtnClick}
          >
            Save
          </Button>
          <Button
            buttonType="outlined"
            buttonSize="large"
            onClick={handleResetBtnClick}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
