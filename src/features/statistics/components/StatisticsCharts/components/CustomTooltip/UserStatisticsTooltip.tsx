import { FC } from "react";

import TooltipWrapper from "./TooltipWrapper";

const UserStatisticsTooltip: FC<any> = ({ payload }: any) => {
  const users = payload[0]?.payload?.users as string[];

  if (!payload || !users) {
    return null;
  }

  return (
    <TooltipWrapper>
      <div className="d-flex align-items-center">
        <h5 className="text-truncate">
          Users:&nbsp;<span className="fw-bold">{users.join(", ")}</span>
        </h5>
      </div>
      {payload.map(({ name, value }: { name: string; value: number }) => (
        <h5 key={name}>
          {name}: {value}
        </h5>
      ))}
    </TooltipWrapper>
  );
};

export default UserStatisticsTooltip;
