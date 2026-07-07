import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Thermometer } from "lucide-react";

const data = [
  { time: "09", temp: 4.5 },
  { time: "10", temp: 5.0 },
  { time: "11", temp: 5.8 },
  { time: "12", temp: 6.2 },
  { time: "13", temp: 5.9 },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 shadow-xl">
      <p className="font-mono text-[10px] text-[var(--muted)] mb-1">{label}:00</p>
      <p className="font-mono text-sm font-semibold text-[var(--ice)]">
        {payload[0].value}°C
      </p>
    </div>
  );
}

function TemperatureChart() {
  return (
    <div className="glass lift rounded-2xl p-6 h-[400px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Thermometer size={18} className="text-[var(--ice)]" />
        <h2 className="font-display text-lg font-semibold text-[var(--frost)]">
          Temperature Trend
        </h2>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="var(--border-soft)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="var(--muted)"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              stroke="var(--muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="var(--ice)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--ice)", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "var(--frost)", stroke: "var(--ice)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TemperatureChart;
