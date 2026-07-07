import { useCountUp } from "../hooks/useCountUp";

function StatCard({ title, value, color, icon: Icon }) {
  const animated = useCountUp(value);
  const isLoading = typeof value === "string" && value.includes("--");

  return (
    <div className="glass lift rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)]">
          {title}
        </p>
        {Icon && <Icon size={16} className={color} />}
      </div>

      {isLoading ? (
        <div className="skeleton h-9 w-20">--</div>
      ) : (
        <h2 className={`font-display text-3xl md:text-4xl font-semibold ${color}`}>
          {animated}
        </h2>
      )}
    </div>
  );
}

export default StatCard;
