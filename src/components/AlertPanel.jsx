import { BellRing } from "lucide-react";

const alerts = [
  {
    time: "10:22",
    truck: "TRK-002",
    msg: "Temperature Critical",
    color: "text-red-400",
  },
  {
    time: "10:14",
    truck: "TRK-005",
    msg: "Cooling Restored",
    color: "text-green-400",
  },
  {
    time: "09:56",
    truck: "TRK-001",
    msg: "Back to Normal",
    color: "text-cyan-400",
  },
];

function AlertPanel() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center gap-2 mb-6">

        <BellRing className="text-yellow-400" />

        <h2 className="text-xl font-semibold">
          Recent Alerts
        </h2>

      </div>

      <div className="space-y-4">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className="border-b border-slate-700 pb-4"
          >

            <p className="text-gray-400 text-sm">
              {alert.time}
            </p>

            <h3 className="font-bold">
              {alert.truck}
            </h3>

            <p className={alert.color}>
              {alert.msg}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AlertPanel;