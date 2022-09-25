import { FC } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { selectCurrentSettings } from "../../../settings/services/selectors";
import { useAppDispatch, useAppSelector } from "../../../../services/hooks";
import { selectQuizTopics } from "../../../quiz/services/selectors";
import Button from "../../../../components/UI/Button";
import Chip from "../../../../components/UI/Chip";

import styles from "./topicModal.module.scss";
import { setTopic, removeTopic } from "../../../quiz/services/slice";

const TopicModal: FC = () => {
  const { topics: availableTopics } = useAppSelector(selectCurrentSettings);
  const selectedTopics = useAppSelector(selectQuizTopics);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTopicSelect = (topic: string) => {
    dispatch(setTopic(topic));
  };

  const handleTopicDelete = (topic: string) => {
    dispatch(removeTopic(topic));
  };

  return (
    <div className={styles.topicModalBody}>
      <h1 className={styles.title}>Choose your favorite topics</h1>
      <h3 className={styles.info}>Select 1 or more topic</h3>
      <div className={styles.topicList}>
        {availableTopics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <Chip
              key={topic}
              label={topic}
              size="large"
              color={isSelected ? "primary" : "default"}
              onClick={() => handleTopicSelect(topic)}
              onDelete={isSelected ? () => handleTopicDelete(topic) : undefined}
            />
          );
        })}
      </div>
      <Button
        className={styles.button}
        buttonType="primary"
        buttonSize="large"
        disabled={!selectedTopics.length}
        onClick={() =>
          navigate({
            pathname: "/quiz",
            search: `?${createSearchParams({
              topics: selectedTopics.toString(),
            })}`,
          })
        }
      >
        Start&nbsp;Quiz
      </Button>
    </div>
  );
};

export default TopicModal;
