import React from "react";
import useFetch from "use-http";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

import { HOST } from "../../util/network";

type Metric = { name: string; value: number }

const renderBarChart = (data: Metric[]) => (
  <BarChart width={600} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Bar dataKey="value" barSize={30} fill="#8884d8" />
  </BarChart>
);

type VisualProps = { type: "day" | "hour" | "minute" };

const Visual: React.FC<VisualProps> = ({ type }) => {
  const [data, setData] = React.useState<Metric[]>([]);

  const { get, response, loading, error } = useFetch(HOST);

  React.useEffect(() => {
    async function fetchMetrics() {
      const metrics = await get(
        "/metrics/stats?metric_info[timestamp_type]=day"
      );
      console.log(metrics);
      if (response.ok) setData(metrics);
    }
    fetchMetrics();
  }, [get, response]);

  return (
    <div>
      <h1>{type}</h1>
      {loading && "Loading...."}
      {error && error.message}
      {data.length > 0 && renderBarChart(data)}
    </div>
  );
};

export default Visual;
