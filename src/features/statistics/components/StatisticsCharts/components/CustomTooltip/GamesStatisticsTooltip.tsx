import { FC } from "react";

import TooltipWrapper from "./TooltipWrapper";

const GamesStatisticsTooltip: FC<any> = (props) => {
  const { label, labelFormatter, payload } = props;

  if (!label || !payload || !payload.length) {
    return null;
  }

  const { name, value } = payload[0];

  return (
    <TooltipWrapper>
      <h4>{labelFormatter(label)}</h4>
      <h5>
        {name}: {value}
      </h5>
    </TooltipWrapper>
  );
};

export default GamesStatisticsTooltip;
