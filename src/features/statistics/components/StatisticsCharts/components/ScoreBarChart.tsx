import { FC } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  Label,
} from "recharts";

import { COLORS, labelColor } from "../colors";
import { useGetScoreStatistics } from "../../../hooks/useGetScoreStatistics";
import ScoreTooltip from "./CustomTooltip/ScoreTooltip";

export type Props = {
  type: "users" | "games";
};

const ScoreBarChart: FC<Props> = ({ type }) => {
  const { data } = useGetScoreStatistics(type);

  return (
    <ResponsiveContainer width="95%" aspect={2}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="0" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={COLORS[0]} stopOpacity={1} />
            <stop offset="90%" stopColor={COLORS[1]} stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={COLORS[1]} stopOpacity={1} />
            <stop offset="90%" stopColor={COLORS[2]} stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={COLORS[2]} stopOpacity={1} />
            <stop offset="90%" stopColor={COLORS[3]} stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={COLORS[3]} stopOpacity={1} />
            <stop offset="90%" stopColor={COLORS[4]} stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={COLORS[4]} stopOpacity={1} />
            <stop offset="90%" stopColor={COLORS[5]} stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3" />
        <XAxis name="Score" dataKey="category">
          <Label
            value="Score"
            fill={labelColor}
            position="insideBottomRight"
            offset={-5}
          />
        </XAxis>
        <YAxis>
          <Label
            value="Count"
            fill={labelColor}
            position="insideLeft"
            angle={-90}
          />
        </YAxis>
        <Tooltip content={<ScoreTooltip type={type} />} />
        <Bar dataKey="count" barSize={30}>
          {data?.map(({ category }, index) => {
            return (
              <Cell
                key={category}
                stroke={COLORS[index]}
                fill={`url(#${index})`}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreBarChart;
