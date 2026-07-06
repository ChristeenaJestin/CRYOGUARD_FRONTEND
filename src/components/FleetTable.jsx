const trucks = [
  {
    id: "TRK-001",
    cargo: "Vaccines",
    temp: "5.2°C",
    status: "Safe",
    eta: "1h 20m",
  },
  {
    id: "TRK-002",
    cargo: "Blood",
    temp: "8.4°C",
    status: "Critical",
    eta: "45m",
  },
  {
    id: "TRK-003",
    cargo: "Insulin",
    temp: "6.1°C",
    status: "Warning",
    eta: "58m",
  },
];

function getStatusColor(status) {
  if (status === "Safe") return "bg-green-500";
  if (status === "Warning") return "bg-yellow-500";
  return "bg-red-500";
}

function FleetTable() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold mb-6">
        🚚 Fleet Status
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left text-gray-400">

            <th>Truck</th>
            <th>Cargo</th>
            <th>Temperature</th>
            <th>Status</th>
            <th>ETA</th>

          </tr>

        </thead>

        <tbody>

          {trucks.map((truck) => (

            <tr
              key={truck.id}
              className="border-t border-slate-700 h-16"
            >

              <td>{truck.id}</td>

              <td>{truck.cargo}</td>

              <td>{truck.temp}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(truck.status)}`}
                >
                  {truck.status}
                </span>

              </td>

              <td>{truck.eta}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default FleetTable;