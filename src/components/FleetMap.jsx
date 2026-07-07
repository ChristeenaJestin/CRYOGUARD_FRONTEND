import { Truck } from "lucide-react";

function FleetMap() {
  return (
    <div className="glass lift rounded-2xl p-6 h-[400px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Truck size={18} className="text-[var(--ice)]" />
        <h2 className="font-display text-lg font-semibold text-[var(--frost)]">
          Live Fleet Tracking
        </h2>
      </div>

      <div className="flex-1 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg)]/40 flex items-center justify-center">
        <p className="font-mono text-xs tracking-wide text-[var(--muted)]">
          Map will be integrated tomorrow
        </p>
      </div>
    </div>
  );
}

export default FleetMap;
