import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import FleetMap from "../components/FleetMap";
import TemperatureChart from "../components/TemperatureChart";
import FleetTable from "../components/FleetTable";
import AIRiskPanel from "../components/AIRiskPanel";
import AlertPanel from "../components/AlertPanel";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#07131F] text-white">

      <Navbar />

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 px-8 py-6">
        <StatCard
          title="Fleet Health"
          value="96%"
          color="text-green-400"
        />

        <StatCard
          title="Average Temp"
          value="5.4°C"
          color="text-cyan-400"
        />

        <StatCard
          title="Alerts"
          value="3"
          color="text-red-400"
        />

        <StatCard
          title="Cold Hubs"
          value="17"
          color="text-blue-400"
        />
      </div>

      {/* Map + Chart */}
      <div className="grid grid-cols-3 gap-6 px-8">
        <div className="col-span-2">
          <FleetMap />
        </div>

        <TemperatureChart />
      </div>

      {/* Fleet Table */}
      <div className="px-8 py-6">
        <FleetTable />
      </div>
      <div className="grid grid-cols-2 gap-6 px-8 pb-8">

    <AIRiskPanel />

    <AlertPanel />

</div>

    </div>
  );
}

export default Dashboard;