import { useState, useEffect } from "react";
import { Truck } from "lucide-react";
import { getVehicles } from "../services/api";

function getStatusStyle(status) {
  if (status === "Safe") return "bg-[var(--safe-dim)] text-[var(--safe)]";
  if (status === "Warning") return "bg-[var(--warn-dim)] text-[var(--warn)]";
  return "bg-[var(--critical-dim)] text-[var(--critical)]";
}

function FleetTable() {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {

  async function loadVehicles() {

    try {

      const data = await getVehicles();

      const formatted = data.map((truck) => {

        let status = "Safe";

        if (truck.temperature >= 8) {
          status = "Critical";
        } else if (truck.temperature >= 6) {
          status = "Warning";
        }

        return {
          ...truck,

          temp: Number(truck.temperature).toFixed(1),

          cargo: truck.cargo ?? "Vaccines",

          eta: truck.eta ?? "45 min",

          status,
        };
      });

      setTrucks(formatted);

    } catch (err) {
      console.error(err);
    }

  }

  loadVehicles();

  const interval = setInterval(loadVehicles, 3000);

  return () => clearInterval(interval);

}, []);

  return (
    <div className="glass lift rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Truck size={18} className="text-[var(--ice)]" />
        <h2 className="font-display text-lg font-semibold text-[var(--frost)]">
          Fleet Status
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-[var(--border)]">
              <th className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] font-normal pb-3 pr-4">
                Truck
              </th>
              <th className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] font-normal pb-3 pr-4">
                Cargo
              </th>
              <th className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] font-normal pb-3 pr-4">
                Temperature
              </th>
              <th className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] font-normal pb-3 pr-4">
                Status
              </th>
              <th className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] font-normal pb-3">
                ETA
              </th>
            </tr>
          </thead>

          <tbody>
            {trucks.length === 0 &&
              [0, 1, 2].map((i) => (
                <tr key={i} className="border-b border-[var(--border-soft)] h-14">
                  <td className="pr-4"><div className="skeleton h-4 w-10">·</div></td>
                  <td className="pr-4"><div className="skeleton h-4 w-16">·</div></td>
                  <td className="pr-4"><div className="skeleton h-4 w-14">·</div></td>
                  <td className="pr-4"><div className="skeleton h-6 w-16 rounded-full">·</div></td>
                  <td><div className="skeleton h-4 w-12">·</div></td>
                </tr>
              ))}

            {trucks.map((truck) => (
              <tr
                key={truck.vehicle}
                className="border-b border-[var(--border-soft)] last:border-0 h-14 hover:bg-[var(--surface-raised)] transition-colors"
              >
                <td className="font-mono text-[var(--frost)] pr-4">{truck.vehicle}</td>
                <td className="text-[var(--muted)] pr-4">{truck.cargo ?? "—"}</td>
                <td className="font-mono text-[var(--frost)] pr-4">
                  {truck.temp !== undefined ? `${truck.temp}°C` : "—"}
                </td>
                <td className="pr-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(truck.status)}`}
                  >
                    {truck.status === "Critical" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--critical)] pulse-ring" />
                    )}
                    {truck.status ?? "Unknown"}
                  </span>
                </td>
                <td className="font-mono text-[var(--muted)]">{truck.eta ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FleetTable;
