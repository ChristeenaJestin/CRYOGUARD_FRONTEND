import { TriangleAlert, BrainCircuit, MapPinned } from "lucide-react";

function AIRiskPanel() {
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
            96%
          </h2>
        </div>

        <div className="border-t border-[var(--border-soft)] pt-4">
          <div className="flex items-center gap-2">
            <TriangleAlert size={16} className="text-[var(--critical)]" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)]">
              Highest Risk
            </span>
          </div>
          <p className="mt-2 text-xl font-semibold text-[var(--frost)]">TRK-002</p>
          <p className="text-sm text-[var(--muted)]">Blood Samples</p>
        </div>

        <div className="border-t border-[var(--border-soft)] pt-4">
          <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] mb-1">
            Prediction
          </p>
          <p className="text-[var(--critical)] font-medium text-sm">
            Temperature will exceed
          </p>
          <h2 className="font-display text-3xl font-semibold text-[var(--frost)] mt-1">
            8°C
          </h2>
          <p className="text-sm text-[var(--muted)] mt-0.5">within 13 minutes</p>
        </div>

        <div className="border-t border-[var(--border-soft)] pt-4">
          <div className="flex gap-2 items-center">
            <MapPinned size={16} className="text-[var(--ice)]" />
            <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)]">
              Recommendation
            </p>
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">Nearest Cold Hub</p>
          <h2 className="text-xl font-semibold text-[var(--ice)]">2.4 km Away</h2>
        </div>
      </div>
    </div>
  );
}

export default AIRiskPanel;
