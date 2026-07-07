import { BellRing } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAlerts } from "../services/api";
import AlertToast from "./AlertToast";

let toastId = 0;

function AlertPanel() {
  const [alerts, setAlerts] = useState([]);
  const [toasts, setToasts] = useState([]);
  const seen = useRef(new Set());

 useEffect(() => {

  async function loadAlerts() {

    try {

      const data = await getAlerts();

      const formatted = data.map((alert) => ({

        truck: `Truck-${String(alert.vehicle_id).padStart(3, "0")}`,

        msg: alert.message,

        color:
          alert.severity === "Critical"
            ? "text-[var(--critical)]"
            : "text-[var(--warn)]",

        time: new Date(alert.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        severity: alert.severity,

      }));

      setAlerts(formatted);

      // Toasts for new critical alerts
      const critical = formatted.filter(
        (a) =>
          a.severity === "Critical" &&
          !seen.current.has(`${a.truck}-${a.time}`)
      );

      critical.forEach((a) =>
        seen.current.add(`${a.truck}-${a.time}`)
      );

      if (critical.length) {

        setToasts((prev) => [

          ...prev,

          ...critical.map((a) => ({

            id: ++toastId,

            truck: a.truck,

            msg: a.msg,

          })),

        ]);

      }

    } catch (err) {

      console.error(err);

    }

  }

  loadAlerts();

  const interval = setInterval(loadAlerts, 3000);

  return () => clearInterval(interval);

}, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="glass lift rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <BellRing size={18} className="text-[var(--warn)]" />
        <h2 className="font-display text-lg font-semibold text-[var(--frost)]">
          Recent Alerts
        </h2>
      </div>

      <div className="space-y-1">
        {alerts.length === 0 && (
          <p className="font-mono text-xs text-[var(--muted)] py-4">
            No alerts yet.
          </p>
        )}

        {alerts.map((alert, index) => (
          <div
            key={index}
            className="py-4 border-b border-[var(--border-soft)] last:border-0"
          >
            <div className="flex items-center gap-2">
              {alert.color?.includes("red") && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--critical)] pulse-ring" />
              )}
              <p className="font-mono text-[11px] text-[var(--muted)]">
                {alert.time}
              </p>
            </div>
            <h3 className="font-medium text-[var(--frost)] mt-1">{alert.truck}</h3>
            <p className={`text-sm mt-0.5 ${alert.color}`}>{alert.msg}</p>
          </div>
        ))}
      </div>

      <AlertToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default AlertPanel;
