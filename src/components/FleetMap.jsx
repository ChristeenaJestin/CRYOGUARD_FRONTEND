import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { getVehicles } from "../services/api";

import "leaflet/dist/leaflet.css";

const truckIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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

    const interval = setInterval(loadVehicles,3000);

    return ()=>clearInterval(interval);

  },[]);

  return (

    <div className="glass lift rounded-2xl p-6 h-[400px] flex flex-col">

      <div className="flex items-center gap-2 mb-4">

        <Truck size={18} className="text-[var(--ice)]" />

        <h2 className="font-display text-lg font-semibold text-[var(--frost)]">

          Live Fleet Tracking

        </h2>

      </div>

      <div className="flex-1 rounded-xl overflow-hidden">

        <MapContainer

          center={[10.031,76.312]}

          zoom={11}

          style={{height:"100%",width:"100%"}}

        >

          <TileLayer

            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

          />

          {vehicles.map((truck)=>(

            <Marker

              key={truck.id}

              position={[truck.lat,truck.lon]}

              icon={truckIcon}

            >

              <Popup>

                <b>{truck.vehicle}</b>

                <br/>

                Driver : {truck.driver}

                <br/>

                Temp : {truck.temperature.toFixed(1)}°C

                <br/>

                Speed : {truck.speed} km/h

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>

    </div>

  );

}

export default FleetMap;
