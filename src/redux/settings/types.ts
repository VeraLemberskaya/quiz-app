import { Status } from "../quiz/types";

export type Topic = {
  name: string;
  selected: boolean;
};

export type AmountValue = {
  value: number;
  selected: boolean;
};

export type SettingSliceState = {
  topics: Topic[];
  questionAmountValues: AmountValue[];
  answerAmountValues: AmountValue[];
  status: Status;
};
