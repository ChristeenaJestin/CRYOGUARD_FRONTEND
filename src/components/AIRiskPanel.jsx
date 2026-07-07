import {
  TriangleAlert,
  BrainCircuit,
  MapPinned,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  getAnalytics,
  getVehicles,
  analyzeVehicle,
} from "../services/api";

function AIRiskPanel() {
  const [risk, setRisk] = useState({
    fleetHealth: "--",
    truck: "--",
    cargo: "Medical Supplies",
    prediction: "Loading AI analysis...",
    hub: "2.4 km Away",
  });

  useEffect(() => {
    async function loadAI() {
      try {
        const analytics = await getAnalytics();

        const vehicles = await getVehicles();

        if (!vehicles.length) return;

        const hottest = [...vehicles].sort(
          (a, b) => b.temperature - a.temperature
        )[0];

        const ai = await analyzeVehicle(hottest.id);

        let analysis = ai.analysis;

        if (analysis === "Gemini API Error") {
          analysis = `
Risk Level: ${hottest.status}

Current Temperature:
${hottest.temperature.toFixed(1)}°C

Humidity:
${hottest.humidity}%

Recommendation:

Inspect refrigeration unit immediately.

Monitor temperature continuously.

Divert to nearest cold hub if temperature exceeds 8°C.
`;
        }

        setRisk({
          fleetHealth: analytics.fleetHealth,

          truck: hottest.vehicle,

           cargo: hottest.cargo,

          prediction: analysis,

          hub: "2.4 km Away",
        });
      } catch (err) {
        console.error(err);

        setRisk((prev) => ({
          ...prev,
          prediction:
            "Unable to contact AI service.",
        }));
      }
    }

    loadAI();

    const interval = setInterval(loadAI, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 h-full">

      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit
          size={20}
          className="text-[var(--ice)]"
        />

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
            <TriangleAlert
              size={16}
              className="text-[var(--critical)]"
            />

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

          <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] mb-2">
            AI Analysis
          </p>

          <div className="rounded-xl bg-[var(--surface-raised)] p-4">

            <p className="text-sm text-[var(--muted)] leading-6 whitespace-pre-wrap">
              {risk.prediction}
            </p>

          </div>

        </div>

        <div className="border-t border-[var(--border-soft)] pt-4">

          <div className="flex gap-2 items-center">

            <MapPinned
              size={16}
              className="text-[var(--ice)]"
            />

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