import { FC } from "react";
import { Control } from "react-hook-form";

import { useAppSelector } from "../../../store/hooks";
import {
  selectCurrentSettings,
  selectSettingsTopics,
} from "../services/selectors";
import { SettingsValues } from "../services/types";

import SettingChipList from "./SettingsChipList";

type Props = {
  control: Control<SettingsValues, object>;
};

const TopicsField: FC<Props> = ({ control }) => {
  const topics = useAppSelector(selectSettingsTopics);
  const { topics: currentTopics } = useAppSelector(selectCurrentSettings);

  return (
    <SettingChipList
      label="Quiz topics:"
      options={topics.map((topic) => topic.name)}
      defaultValue={currentTopics}
      name="topics"
      control={control}
    />
  );
};

export default TopicsField;
