import { FC, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import moment from "moment";

import { COLORS, labelColor } from "../colors";
import { useGetGamesStatisticsQuery } from "../../../services/slice";

import GamesStatisticsTooltip from "./CustomTooltip/GamesStatisticsTooltip";

const DateFormatter = (date: number) => {
  return moment(date).format("ll");
};

const GamesAreaChart: FC = () => {
  const { data } = useGetGamesStatisticsQuery();

  const chartData = useMemo(() => {
    return data?.map((value) => ({
      ...value,
      date: moment(value.date).toDate().getTime(),
    }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" aspect={1.85}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={COLORS[0]} stopOpacity={0.8} />
            <stop offset="100%" stopColor={COLORS[0]} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          scale="time"
          name="Date"
          interval="preserveEnd"
          tickFormatter={DateFormatter}
          domain={["auto", "auto"]}
          tickMargin={8}
          type="number"
        />
        <YAxis>
          <Label
            position="insideLeft"
            value="Count"
            fill={labelColor}
            angle={-90}
          />
        </YAxis>
        <Tooltip
          labelFormatter={DateFormatter}
          content={<GamesStatisticsTooltip />}
        />
        <Area
          name="Game count"
          type="monotone"
          dataKey="gameCount"
          stroke={COLORS[0]}
          fillOpacity={1}
          fill="url(#areaColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GamesAreaChart;
