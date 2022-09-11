import ChartSelect from "./components/ChartSelect";
import GamesAreaChart from "./components/GamesAreaChart";
import GamesScatterChart from "./components/GamesScatterChart";
import ScoreBarChart from "./components/ScoreBarChart";
import ScorePieChart from "./components/ScorePieChart";

export const charts = [
  {
    title: "Games Statistics",
    description:
      "Track games statistics over time. Look at the chart and find users maximum activity period and users minimum activity period.",
    chart: <GamesAreaChart />,
  },
  {
    title: "Users Score",
    description:
      "Find out users score statistics. Study each category of users and ratio between them. You can choose chart type on your choice: bar or pie.",
    chart: (
      <ChartSelect
        label="Select user score chart: "
        charts={{
          pie: <ScorePieChart type="users" />,
          bar: <ScoreBarChart type="users" />,
        }}
        defaultChartType="bar"
      />
    ),
  },
  {
    title: "Users statistics",
    description:
      "Track users statistics according to the score and played games count of a particular user. Find a leader among all users along each scale.",
    chart: <GamesScatterChart />,
  },
  {
    title: "Games Score",
    description:
      "Find out games score statistics. Study each category of score and total game count of each category. You can choose chart type on your choice: bar or pie.",
    chart: (
      <ChartSelect
        label="Select games score chart: "
        charts={{
          pie: <ScorePieChart type="games" />,
          bar: <ScoreBarChart type="games" />,
        }}
        defaultChartType="pie"
      />
    ),
  },
];
