import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../../store/hooks";

import { useGetTopicsQuery } from "../../../home/topicService";
import { selectSelectedTopics } from "../../../home/topicSelectors";
import Modal from "../../../../components/UI/Modal";
import { useQuizTopic } from "../../hooks/useQuizTopic";

import styles from "./topicsModal.module.scss";
import TopicCard from "./TopicCard";

type Props = {
  onClose: () => void;
};

const TopicsModal: FC<Props> = ({ onClose }) => {
  useGetTopicsQuery();

  const topics = useAppSelector(selectSelectedTopics);

  const { setQuizTopic } = useQuizTopic();

  const navigate = useNavigate();

  const handleTopicSelect = (id: string) => {
    setQuizTopic(id);
    navigate("/quiz");
  };

  return (
    <Modal title="Choose quiz topic" onClose={onClose}>
      <div className={styles.topicsModalBody}>
        <div className={styles.topicsGrid}>
          {topics &&
            topics.map(({ id }) => (
              <TopicCard key={id} topicId={id} onSelect={handleTopicSelect} />
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default TopicsModal;
