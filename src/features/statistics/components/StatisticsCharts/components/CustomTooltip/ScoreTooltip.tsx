import { FC } from "react";

import TooltipWrapper from "./TooltipWrapper";

type Props = {
  active?: boolean;
  label?: string;
  payload?: any[];
  type: "users" | "games";
};

const ScoreTooltip: FC<Props> = (props) => {
  const { active, payload, label, type } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }

  const value = payload[0].value;

  return (
    <TooltipWrapper {...props}>
      <h4>Score {label ?? payload[0].name}</h4>
      <h5>
        {type === "users" ? "User" : "Game"} count: {value}
      </h5>
    </TooltipWrapper>
  );
};

export default ScoreTooltip;
