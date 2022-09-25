import { FC } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

import { COLORS, labelColor } from "../colors";
import { useGetUsersStatisticsQuery } from "../../../services/slice";
import UserStatisticsTooltip from "./CustomTooltip/UserStatisticsTooltip";

const GamesScatterChart: FC = () => {
  const { data } = useGetUsersStatisticsQuery();

  return (
    <ResponsiveContainer width="100%" aspect={1.85}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          name="Score"
          ticks={[0, 1, 2, 3, 4, 5]}
          dataKey="score"
          domain={[0, 5]}
          allowDecimals
        >
          <Label
            value="Score"
            fill={labelColor}
            position="insideBottomRight"
            offset={-5}
          />
        </XAxis>
        <YAxis dataKey="totalGames" name="Game count">
          <Label
            value="Count"
            fill={labelColor}
            position="insideLeft"
            angle={-90}
          />
        </YAxis>
        <Tooltip content={<UserStatisticsTooltip />} />
        <Scatter data={data}>
          {data?.map(({ score }, index) => {
            return <Cell key={index} fill={COLORS[Math.round(score)]} />;
          })}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default GamesScatterChart;
