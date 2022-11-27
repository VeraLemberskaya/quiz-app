import { FC } from "react";

import Button from "../../../../../components/UI/Button";
import Card from "../../../../../components/UI/Card";
import { useAppSelector } from "../../../../../store/hooks";
import { selectTopicById } from "../../../../home/topicSelectors";

type Props = {
  topicId: string;
  onSelect: (topicId: string) => void;
};

const TopicCard: FC<Props> = ({ topicId, onSelect }) => {
  const topic = useAppSelector((state) => selectTopicById(state, topicId))!;

  return (
    <Card key={topic.id}>
      <Card.Image variant="top" src={topic.img} alt={topic.name} />
      <Card.Body>
        <Card.Title>{topic?.name}</Card.Title>
        <Card.Text>{topic?.description}</Card.Text>
      </Card.Body>
      <Card.Actions>
        <Button buttonType="primary" onClick={() => onSelect(topic.id)}>
          Select
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default TopicCard;
