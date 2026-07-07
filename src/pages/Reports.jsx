import { useEffect, useState } from "react";
import {
  FileBarChart,
  Activity,
  Thermometer,
  AlertTriangle,
  Database,
} from "lucide-react";

import { getAnalytics, getAlerts } from "../services/api";

function Reports() {
  const [analytics, setAnalytics] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function loadReports() {
      try {
        const stats = await getAnalytics();
        const alertData = await getAlerts();

        setAnalytics(stats);
        setAlerts(alertData.slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    }

    loadReports();

    const interval = setInterval(loadReports, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <div className="mb-8">
        <div className="flex items-center gap-3">

          <FileBarChart
            size={28}
            className="text-cyan-400"
          />

          <h1 className="font-display text-3xl font-bold text-white">
            Fleet Reports
          </h1>

        </div>

        <p className="text-gray-400 mt-2">
          Live operational analytics and fleet summary.
        </p>

      </div>

      {/* Analytics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="glass rounded-2xl p-6">

          <Activity
            className="text-green-400 mb-3"
            size={22}
          />

          <p className="text-gray-400 text-sm">
            Fleet Health
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {analytics?.fleetHealth ?? "--"}%
          </h2>

        </div>

        <div className="glass rounded-2xl p-6">

          <Thermometer
            className="text-cyan-400 mb-3"
            size={22}
          />

          <p className="text-gray-400 text-sm">
            Average Temperature
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-2">
            {analytics?.averageTemperature ?? "--"}°C
          </h2>

        </div>

        <div className="glass rounded-2xl p-6">

          <AlertTriangle
            className="text-red-400 mb-3"
            size={22}
          />

          <p className="text-gray-400 text-sm">
            Total Alerts
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">

            {(analytics?.criticalAlerts || 0) +
              (analytics?.warningAlerts || 0)}

          </h2>

        </div>

        <div className="glass rounded-2xl p-6">

          <Database
            className="text-yellow-400 mb-3"
            size={22}
          />

          <p className="text-gray-400 text-sm">
            Telemetry Records
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {analytics?.telemetryRecords ?? "--"}
          </h2>

        </div>

      </div>

      {/* Fleet Summary */}

      <div className="glass rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold text-white mb-5">
          Fleet Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <p className="text-gray-400 mb-2">
              Active Vehicles
            </p>

            <h3 className="text-3xl font-bold text-cyan-400">
              {analytics?.activeVehicles}
            </h3>

          </div>

          <div>

            <p className="text-gray-400 mb-2">
              Highest Recorded Temperature
            </p>

            <h3 className="text-3xl font-bold text-red-400">
              {analytics?.highestTemperature}°C
            </h3>

          </div>

        </div>

      </div>

      {/* Recent Alerts */}

      <div className="glass rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-white mb-5">
          Recent Alerts
        </h2>

        <div className="space-y-4">

          {alerts.length === 0 && (

            <p className="text-gray-400">
              No alerts available.
            </p>

          )}

          {alerts.map((alert, index) => (

            <div
              key={index}
              className="border-b border-white/10 pb-4"
            >

              <div className="flex justify-between">

                <h3 className="font-semibold text-white">
                  Truck-{String(alert.vehicle_id).padStart(3, "0")}
                </h3>

                <span
                  className={`font-semibold ${
                    alert.severity === "Critical"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {alert.severity}
                </span>

              </div>

              <p className="text-gray-400 mt-2">
                {alert.message}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                {new Date(alert.timestamp).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

export default Reports;