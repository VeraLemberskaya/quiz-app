import { Status } from "../quiz/types";

export type Topic = {
  name: string;
  selected: boolean;
};

export type AmountValue = {
  value: number;
  selected: boolean;
};

export type Settings = {
  topics: Topic[];
  questionAmountValues: AmountValue[];
  answerAmountValues: AmountValue[];
};

export type SettingSliceState = Settings & {
  status: Status;
};
