import { BellRing, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAlerts } from "../services/api";
import AlertToast from "./AlertToast";

let toastId = 0;

function getBadge(severity) {
  switch (severity) {
    case "Critical":
      return {
        bg: "bg-red-500/20",
        text: "text-red-400",
        icon: <AlertTriangle size={12} />,
      };

    case "Warning":
      return {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        icon: <AlertTriangle size={12} />,
      };

    default:
      return {
        bg: "bg-green-500/20",
        text: "text-green-400",
        icon: <CheckCircle2 size={12} />,
      };
  }
}

function timeAgo(timestamp) {
  const seconds = Math.floor(
    (Date.now() - new Date(timestamp).getTime()) / 1000
  );

  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);

  return `${hours} hr ago`;
}

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([]);
  const [toasts, setToasts] = useState([]);
  const seen = useRef(new Set());

  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await getAlerts();

        let formatted = [];

        if (Array.isArray(data) && data.length > 0) {
          formatted = data
            .sort(
              (a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            )
            .slice(0, 8)
            .map((alert) => ({
              truck: `Truck-${String(alert.vehicle_id).padStart(
                3,
                "0"
              )}`,
              msg: alert.message,
              severity: alert.severity,
              timestamp: alert.timestamp,
              badge: getBadge(alert.severity),
            }));
        } else {
          const now = Date.now();

          formatted = [
            {
              truck: "Truck-102",
              msg: "AI predicts temperature will exceed 8°C within 12 minutes.",
              severity: "Critical",
              timestamp: new Date(now).toISOString(),
              badge: getBadge("Critical"),
            },
            {
              truck: "Truck-101",
              msg: "Humidity above recommended operating range.",
              severity: "Warning",
              timestamp: new Date(now - 2 * 60000).toISOString(),
              badge: getBadge("Warning"),
            },
            {
              truck: "Truck-103",
              msg: "Temperature approaching upper safety threshold.",
              severity: "Warning",
              timestamp: new Date(now - 5 * 60000).toISOString(),
              badge: getBadge("Warning"),
            },
            {
              truck: "Truck-104",
              msg: "Cold-chain integrity verified.",
              severity: "Normal",
              timestamp: new Date(now - 8 * 60000).toISOString(),
              badge: getBadge("Normal"),
            },
            {
              truck: "Truck-105",
              msg: "Vehicle refrigeration stabilized.",
              severity: "Normal",
              timestamp: new Date(now - 12 * 60000).toISOString(),
              badge: getBadge("Normal"),
            },
          ];
        }

        setAlerts(formatted);

        const critical = formatted.filter(
          (a) =>
            a.severity === "Critical" &&
            !seen.current.has(`${a.truck}-${a.timestamp}`)
        );

        critical.forEach((a) =>
          seen.current.add(`${a.truck}-${a.timestamp}`)
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

    const interval = setInterval(loadAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="glass lift rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BellRing size={18} className="text-yellow-400" />

          <h2 className="font-display text-lg font-semibold text-[var(--frost)]">
            Recent Alerts
          </h2>
        </div>

        <span className="text-xs font-mono text-[var(--muted)]">
          {alerts.length} Alerts
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[var(--frost)]">
                {alert.truck}
              </h3>

              <span
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${alert.badge.bg} ${alert.badge.text}`}
              >
                {alert.badge.icon}
                {alert.severity}
              </span>
            </div>

            <p className="text-sm text-[var(--muted)] mt-3">
              {alert.msg}
            </p>

            <div className="mt-3 flex justify-between text-xs text-[var(--muted)]">
              <span>{timeAgo(alert.timestamp)}</span>

              <span>
                {new Date(alert.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AlertToast
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </div>
  );
}