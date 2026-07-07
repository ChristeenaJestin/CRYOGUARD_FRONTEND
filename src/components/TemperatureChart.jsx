import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Thermometer } from "lucide-react";
import { getTelemetry } from "../services/api";

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 shadow-xl">
      <p className="font-mono text-xs text-[var(--muted)]">
        {payload[0].payload.time}
      </p>

      <p className="font-semibold text-[var(--ice)]">
        {payload[0].value}°C
      </p>
    </div>
  );
}

function TemperatureChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadTelemetry() {
      try {
        const telemetry = await getTelemetry();

        const formatted = telemetry
          .slice(-20)
          .map((item, index) => ({
            time: new Date(item.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            temp: Number(item.temperature),
            id: index,
          }));

        setData(formatted);
      } catch (err) {
        console.error(err);
      }
    }

    loadTelemetry();

    const interval = setInterval(loadTelemetry, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass lift rounded-2xl p-6 h-[420px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Thermometer size={18} className="text-[var(--ice)]" />

        <h2 className="font-display text-lg font-semibold text-[var(--frost)]">
          Temperature Trend
        </h2>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="tempGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#38bdf8"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#38bdf8"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1f2d3d"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke="#6b7280"
              tick={{ fontSize: 11 }}
              minTickGap={20}
            />

            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 11 }}
              domain={["dataMin - 1", "dataMax + 1"]}
            />

            <Tooltip content={<ChartTooltip />} />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="none"
              fill="url(#tempGradient)"
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#38bdf8",
              }}
              activeDot={{
                r: 6,
                fill: "#ffffff",
                stroke: "#38bdf8",
                strokeWidth: 3,
              }}
              isAnimationActive={true}
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TemperatureChart;