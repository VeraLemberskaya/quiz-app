import { FC, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { COLORS } from "../colors";
import { useGetScoreStatistics } from "../../../hooks/useGetScoreStatistics";

import ScoreTooltip from "./CustomTooltip/ScoreTooltip";

type Props = {
  type: "users" | "games";
};

const ScorePieChart: FC<Props> = ({ type }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const { data } = useGetScoreStatistics(type);

  const activePieSector = (props: any) => {
    return <Sector {...props} outerRadius={props.outerRadius + 3} />;
  };

  const handlePieSectorEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handlePieSectorLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <ResponsiveContainer width="95%" aspect={2}>
      <PieChart margin={{ top: 20, right: 5, bottom: 5, left: 5 }}>
        <Pie
          paddingAngle={1}
          activeIndex={activeIndex}
          activeShape={activePieSector}
          data={data}
          nameKey="category"
          dataKey="count"
          onMouseEnter={handlePieSectorEnter}
          onMouseLeave={handlePieSectorLeave}
          innerRadius={40}
          label
        >
          {data?.map(({ category }, index) => {
            return <Cell key={category} fill={COLORS[index]} />;
          })}
        </Pie>
        <Tooltip content={<ScoreTooltip type={type} />} />
        <Legend layout="vertical" align="left" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ScorePieChart;
