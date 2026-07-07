import { useEffect, useState } from "react";
import { TriangleAlert, X } from "lucide-react";

// Self-contained toast stack. Call `pushToast(setToasts, alert)` from a
// parent whenever a new critical alert is detected — nothing existing
// has to change its data flow to use this.
function AlertToast({ toasts, onDismiss }) {
  return (
    <div className="fixed top-20 right-6 z-[60] flex flex-col gap-3 w-[300px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => onDismiss(toast.id), 280);
    return () => clearTimeout(timer);
  }, [closing, toast.id, onDismiss]);

  return (
    <div
      className={`glass-strong rounded-xl p-4 flex items-start gap-3 ${
        closing ? "toast-out" : "toast-in"
      }`}
    >
      <div className="w-8 h-8 rounded-lg bg-[var(--critical-dim)] flex items-center justify-center shrink-0">
        <TriangleAlert size={16} className="text-[var(--critical)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-[var(--frost)]">{toast.truck}</p>
        <p className="text-xs text-[var(--muted)] mt-0.5 truncate">{toast.msg}</p>
      </div>
      <button
        onClick={() => setClosing(true)}
        aria-label="Dismiss alert"
        className="text-[var(--muted)] hover:text-[var(--frost)] transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default AlertToast;
