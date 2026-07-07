import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

import { getVehicles } from "../services/api";

import "leaflet/dist/leaflet.css";

// --------------------
// Colored Truck Icons
// --------------------

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FleetMap() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadVehicles();

    const interval = setInterval(loadVehicles, 3000);

    return () => clearInterval(interval);
  }, []);

  const safe = vehicles.filter(
    (v) => v.status === "SAFE"
  ).length;

  const warning = vehicles.filter(
    (v) => v.status === "WARNING"
  ).length;

  const critical = vehicles.filter(
    (v) => v.status === "CRITICAL"
  ).length;

  return (
    <div className="glass lift rounded-2xl p-6 h-[500px] flex flex-col">

      <div className="flex items-center gap-2 mb-5">
        <Truck size={20} className="text-[var(--ice)]" />

        <h2 className="font-display text-lg font-semibold text-[var(--frost)]">
          Live Fleet Tracking
        </h2>
      </div>

      {/* Fleet Summary */}

      <div className="grid grid-cols-4 gap-3 mb-5">

        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">
            Vehicles
          </p>

          <h3 className="text-xl font-bold text-white">
            {vehicles.length}
          </h3>
        </div>

        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">
            Safe
          </p>

          <h3 className="text-xl font-bold text-green-400">
            {safe}
          </h3>
        </div>

        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">
            Warning
          </p>

          <h3 className="text-xl font-bold text-yellow-400">
            {warning}
          </h3>
        </div>

        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">
            Critical
          </p>

          <h3 className="text-xl font-bold text-red-500">
            {critical}
          </h3>
        </div>

      </div>

      <div className="flex-1 rounded-xl overflow-hidden">

        <MapContainer
          center={[10.031, 76.312]}
          zoom={11}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {vehicles
            .filter(
              (truck) =>
                truck.latitude &&
                truck.longitude
            )
            .map((truck) => (

              <Marker
                key={truck.id}
                position={[
                  Number(truck.latitude),
                  Number(truck.longitude),
                ]}
                icon={
                  truck.status === "SAFE"
                    ? greenIcon
                    : truck.status === "WARNING"
                    ? yellowIcon
                    : redIcon
                }
              >
                <Popup>

                  <div
                    style={{
                      minWidth: 220,
                      lineHeight: 1.6,
                    }}
                  >

                    <h3
                      style={{
                        marginBottom: 10,
                        fontSize: 18,
                      }}
                    >
                      🚚 {truck.vehicle}
                    </h3>

                    <p>
                      <strong>Driver:</strong>{" "}
                      {truck.driver}
                    </p>

                    <p>
                      <strong>Cargo:</strong>{" "}
                      {truck.cargo || "Medical Supplies"}
                    </p>

                    <p>
                      🌡{" "}
                      <strong>Temperature:</strong>{" "}
                      {Number(
                        truck.temperature
                      ).toFixed(1)}
                      °C
                    </p>

                    <p>
                      💧{" "}
                      <strong>Humidity:</strong>{" "}
                      {truck.humidity}%
                    </p>

                    <p>
                      🚀{" "}
                      <strong>Speed:</strong>{" "}
                      {truck.speed} km/h
                    </p>

                    <p>
                      📍{" "}
                      <strong>Status:</strong>{" "}
                      <span
                        style={{
                          color:
                            truck.status ===
                            "SAFE"
                              ? "#22c55e"
                              : truck.status ===
                                "WARNING"
                              ? "#facc15"
                              : "#ef4444",
                          fontWeight: "bold",
                        }}
                      >
                        {truck.status}
                      </span>
                    </p>

                  </div>

                </Popup>

              </Marker>

            ))}

        </MapContainer>

      </div>

    </div>
  );
}

export default FleetMap;