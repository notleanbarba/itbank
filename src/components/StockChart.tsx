import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { StockAggregateDefinition } from "@types";

export default function StockChart({
  loading,
  data,
  error,
}: {
  loading: boolean;
  data: StockAggregateDefinition[];
  error?: string;
}) {
  if (loading)
    return (
      <div className="h-80 text-lg flex items-center justify-center">
        Cargando datos...
      </div>
    );

  if (error)
    return (
      <div className="h-80 text-lg flex text-red-500 items-center justify-center">
        {error}
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data
          .filter((_, index) => index % 10 === 0)
          .map((item) => ({
            c: item.c,
            v: item.v,
            date: new Date(item.t).toLocaleDateString(),
          }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="c"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
