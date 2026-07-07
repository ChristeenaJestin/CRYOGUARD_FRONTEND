import { FileBarChart2 } from "lucide-react";

function Reports() {
  return (
    <main className="page-transition max-w-7xl mx-auto px-6 md:px-8 py-24">
      <div className="glass lift max-w-md mx-auto text-center rounded-2xl p-12">
        <div className="w-12 h-12 rounded-xl bg-[var(--ice-dim)] flex items-center justify-center mx-auto mb-6">
          <FileBarChart2 size={22} className="text-[var(--ice)]" />
        </div>
        <h1 className="font-display text-xl font-semibold text-[var(--frost)] mb-2">
          Reports are being wired up
        </h1>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Historical breach summaries and fleet analytics will appear here
          once the reporting endpoint is connected. For now, live status
          lives on the dashboard.
        </p>
      </div>
    </main>
  );
}

export default Reports;
