import { useEffect, useState } from "react";
import { Activity, Thermometer, BellRing, Warehouse } from "lucide-react";
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
        fleetHealth: Math.max(
          0,
          Math.min(
            100,
            100 - Math.round((data.criticalAlerts || 0) * 5)
          )
        ),

        averageTemp: data.averageTemperature,

        alerts:
          (data.criticalAlerts || 0) +
          (data.warningAlerts || 0),

        // Placeholder until we add actual hub data
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
            Live console
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--frost)]">
            Fleet Overview
          </h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Fleet Health"
            value={`${dashboard?.fleetHealth ?? "--"}%`}
            color="text-[var(--safe)]"
            icon={Activity}
          />
          <StatCard
            title="Average Temp"
            value={`${dashboard?.averageTemp ?? "--"}°C`}
            color="text-[var(--ice)]"
            icon={Thermometer}
          />
          <StatCard
            title="Alerts"
            value={dashboard?.alerts ?? "--"}
            color="text-[var(--critical)]"
            icon={BellRing}
          />
          <StatCard
            title="Cold Hubs"
            value={dashboard?.coldHubs ?? "--"}
            color="text-[var(--ice-soft)]"
            icon={Warehouse}
          />
        </div>

        {/* Map + Chart */}
        <Reveal className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <FleetMap />
          </div>
          <TemperatureChart />
        </Reveal>

        {/* Fleet Table */}
        <Reveal className="mb-6" delay={80}>
          <FleetTable />
        </Reveal>

        {/* AI + Alerts */}
        <Reveal as="div" className="grid lg:grid-cols-2 gap-6 pb-8" delay={120}>
          <AIRiskPanel />
          <AlertPanel />
        </Reveal>
      </div>
    </main>
  );
}

export default Dashboard;
