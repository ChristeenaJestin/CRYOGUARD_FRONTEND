import { TriangleAlert, BrainCircuit, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { getAnalytics, getVehicles } from "../services/api";

function AIRiskPanel() {

  const [risk, setRisk] = useState({
    fleetHealth: "--",
    truck: "--",
    cargo: "Medical Supplies",
    prediction: "--",
    minutes: "--",
    hub: "2.4 km Away"
  });

  useEffect(() => {

    async function loadAI() {

      try {

        const analytics = await getAnalytics();
        const vehicles = await getVehicles();

        if (!vehicles.length) return;

        const hottest = [...vehicles].sort(
          (a,b)=>b.temperature-a.temperature
        )[0];

        let prediction = "Safe";

        let minutes = "--";

        if(hottest.temperature>=8){

          prediction="Temperature will exceed";

          minutes="5";

        }

        else if(hottest.temperature>=6){

          prediction="Temperature rising";

          minutes="13";

        }

        else{

          prediction="Temperature Stable";

          minutes="--";

        }

        const fleetHealth=Math.max(
          0,
          100-(analytics.criticalAlerts*5)
        );

        setRisk({

          fleetHealth,

          truck:hottest.vehicle,

          cargo:"Medical Supplies",

          prediction,

          minutes,

          hub:"2.4 km Away"

        });

      }

      catch(err){

        console.log(err);

      }

    }

    loadAI();

    const interval=setInterval(loadAI,3000);

    return ()=>clearInterval(interval);

  },[]);

  return (

    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 h-full">

      <div className="flex items-center gap-2 mb-6">

        <BrainCircuit size={20} className="text-[var(--ice)]" />

        <h2 className="font-display text-lg font-semibold text-[var(--frost)]">

          AI Fleet Intelligence

        </h2>

      </div>

      <div className="space-y-5">

        <div>

          <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] mb-1">

            Fleet Health

          </p>

          <h2 className="font-display text-4xl font-semibold text-[var(--safe)]">

            {risk.fleetHealth}%

          </h2>

        </div>

        <div className="border-t border-[var(--border-soft)] pt-4">

          <div className="flex items-center gap-2">

            <TriangleAlert size={16} className="text-[var(--critical)]" />

            <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)]">

              Highest Risk

            </span>

          </div>

          <p className="mt-2 text-xl font-semibold text-[var(--frost)]">

            {risk.truck}

          </p>

          <p className="text-sm text-[var(--muted)]">

            {risk.cargo}

          </p>

        </div>

        <div className="border-t border-[var(--border-soft)] pt-4">

          <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] mb-1">

            Prediction

          </p>

          <p className="text-[var(--critical)] font-medium text-sm">

            {risk.prediction}

          </p>

          <h2 className="font-display text-3xl font-semibold text-[var(--frost)] mt-1">

            8°C

          </h2>

          <p className="text-sm text-[var(--muted)] mt-0.5">

            within {risk.minutes} minutes

          </p>

        </div>

        <div className="border-t border-[var(--border-soft)] pt-4">

          <div className="flex gap-2 items-center">

            <MapPinned size={16} className="text-[var(--ice)]" />

            <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)]">

              Recommendation

            </p>

          </div>

          <p className="mt-2 text-sm text-[var(--muted)]">

            Nearest Cold Hub

          </p>

          <h2 className="text-xl font-semibold text-[var(--ice)]">

            {risk.hub}

          </h2>

        </div>

      </div>

    </div>

  );

}

export default AIRiskPanel;