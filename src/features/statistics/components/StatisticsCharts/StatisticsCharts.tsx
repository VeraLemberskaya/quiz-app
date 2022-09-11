import { FC, useEffect, useState } from "react";
import { BsGrid } from "react-icons/bs";

import { MdOutlineInsertChartOutlined } from "react-icons/md";

import styles from "./statisticsCharts.module.scss";
import { charts } from "./charts";
import Button from "../../../../components/UI/Button";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import ChartPagination from "./components/ChartPagination";

type DisplayMode = "grid" | "page";

const StatisticsCharts: FC = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("grid");

  const matches = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    if (matches) {
      setDisplayMode("page");
    } else {
      setDisplayMode("grid");
    }
  }, [matches]);

  const toggleMode = () => {
    setDisplayMode((prevState) => {
      if (prevState === "grid") return "page";
      return "grid";
    });
  };

  return (
    <div className={styles.statisticsChartsBody}>
      {displayMode === "grid" ? (
        <div className={styles.chartsGridContainer}>
          {charts.map(({ chart, title }) => (
            <div key={title}>{chart}</div>
          ))}
        </div>
      ) : (
        <ChartPagination />
      )}
      <Button
        className={styles.modeButton}
        buttonType="iconBtn"
        onClick={toggleMode}
      >
        {displayMode === "grid" ? <MdOutlineInsertChartOutlined /> : <BsGrid />}
      </Button>
    </div>
  );
};

export default StatisticsCharts;
