import { FC, useState } from "react";

import Select from "../../../../../components/UI/Select";

type Props = {
  label: string;
  defaultChartType: string;
  charts: Record<string, JSX.Element>;
};

const ChartSelect: FC<Props> = ({ label, defaultChartType, charts }) => {
  const [selectedChart, setSelectedChart] = useState<string>(defaultChartType);

  const handleChartSelect = (value: any) => {
    setSelectedChart(value);
  };

  return (
    <div className="d-flex flex-column">
      <div className="mb-1 ms-5">
        <Select
          label={label}
          defaultValue={selectedChart}
          options={Object.keys(charts)}
          onSelect={handleChartSelect}
        />
      </div>
      {charts[selectedChart]}
    </div>
  );
};

export default ChartSelect;
