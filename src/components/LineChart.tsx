import React from "react";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
import type { WeightEntry } from "../types/types";
import dayjs from "dayjs";

interface LineChartProps {
  weightEntries: WeightEntry[];
}

const LineChart: React.FC<LineChartProps> = ({ weightEntries }) => {
  const sortedEntries = [...weightEntries].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const xAxisData = sortedEntries.map((entry) =>
    dayjs(entry.createdAt).format("DD MMM")
  );

  const weightData = sortedEntries.map((entry) => entry.weight);

  return (
    <section className="w-full">
      <h1 className="text-xl text-center text-[#002A48] py-4">
        Weight Progress
      </h1>
      <div className="w-full">
        <MuiLineChart
          xAxis={[
            {
              data: xAxisData.length ? xAxisData : [""],
              scaleType: "point",
              label: "Date",
            },
          ]}
          series={[
            {
              data: weightData.length ? weightData : [0],
              label: "Weight (kg)",
            },
          ]}
          height={300}
        />
      </div>
    </section>
  );
};

export default LineChart;
