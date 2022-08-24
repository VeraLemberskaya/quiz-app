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
  questionTime: number;
};

export type SettingsValues = {
  topics: string[];
  questionAmount: number;
  answerAmount: number;
  questionTime: number;
};
