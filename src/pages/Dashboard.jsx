import { useEffect, useState } from "react";
import {
  Activity,
  Thermometer,
  BellRing,
  Warehouse,
} from "lucide-react";

import StatCard from "../components/StatCard";
import FleetMap from "../components/FleetMap";
import TemperatureChart from "../components/TemperatureChart";
import FleetTable from "../components/FleetTable";
import AIRiskPanel from "../components/AIRiskPanel";
import AlertPanel from "../components/AlertPanel";
import FrostField from "../components/FrostField";
import Reveal from "../components/Reveal";

import { getAnalytics } from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getAnalytics();

        setDashboard({
          fleetHealth: data.fleetHealth,

          averageTemp: data.averageTemperature,

          alerts:
            (data.criticalAlerts || 0) +
            (data.warningAlerts || 0),

          coldHubs: 12,

          activeVehicles: data.activeVehicles,

          highestTemperature: data.highestTemperature,

          telemetryRecords: data.telemetryRecords,

          criticalAlerts: data.criticalAlerts,

          warningAlerts: data.warningAlerts,
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();

    const interval = setInterval(loadDashboard, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative page-transition">
      <FrostField />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-8">
        <div className="mb-8">
          <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--ice)] mb-1.5">
            Live Console
          </p>

          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--frost)]">
            Fleet Overview
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  <StatCard
    title="Fleet Health"
    value={`${dashboard?.fleetHealth ?? "--"}%`}
    subtitle="Overall Fleet Status"
    progress={dashboard?.fleetHealth}
    color="text-green-400"
    icon={Activity}
  />

  <StatCard
    title="Average Temp"
    value={`${dashboard?.averageTemp ?? "--"}°C`}
    subtitle="Target: 4°C – 6°C"
    progress={75}
    color="text-cyan-400"
    icon={Thermometer}
  />

  <StatCard
    title="Alerts"
    value={dashboard?.alerts ?? "--"}
    subtitle="Active Monitoring"
    progress={100}
    color="text-red-400"
    icon={BellRing}
  />

  <StatCard
    title="Cold Hubs"
    value={dashboard?.coldHubs ?? "--"}
    subtitle="Operational"
    progress={100}
    color="text-blue-400"
    icon={Warehouse}
  />

</div>

        <Reveal className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <FleetMap />
          </div>

          <TemperatureChart />
        </Reveal>

        <Reveal className="mb-6" delay={80}>
          <FleetTable />
        </Reveal>

        <Reveal
          as="div"
          className="grid lg:grid-cols-2 gap-6 pb-8"
          delay={120}
        >
          <AIRiskPanel />
          <AlertPanel />
        </Reveal>
      </div>
    </main>
  );
}

export default Dashboard;