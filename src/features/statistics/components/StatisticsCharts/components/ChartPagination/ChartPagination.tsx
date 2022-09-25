import { FC, useState } from "react";

import { charts } from "../../charts";
import styles from "./chartPagination.module.scss";
import Pagination from "../../../../../../components/UI/Pagination";

const ChartPagination: FC = () => {
  const [selectedChartIndex, setSelectedChartIndex] = useState<number>(0);

  return (
    <>
      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h1> {charts[selectedChartIndex].title}</h1>
          <p>{charts[selectedChartIndex].description}</p>
        </div>
        <div className="position-relative">
          <div className={styles.chart}>{charts[selectedChartIndex].chart}</div>
          <Pagination
            type="arrow"
            pageCount={charts.length}
            forcePage={selectedChartIndex}
            onPageChange={(page) => setSelectedChartIndex(page)}
          />
        </div>
      </div>
    </>
  );
};

export default ChartPagination;
