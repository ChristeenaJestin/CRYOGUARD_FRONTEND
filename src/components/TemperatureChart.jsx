import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { time: "09", temp: 4.5 },
  { time: "10", temp: 5.0 },
  { time: "11", temp: 5.8 },
  { time: "12", temp: 6.2 },
  { time: "13", temp: 5.9 },
];

function TemperatureChart() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 h-[400px] shadow-lg">

      <h2 className="text-xl font-semibold mb-4">
        🌡 Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#00C2FF"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default TemperatureChart;