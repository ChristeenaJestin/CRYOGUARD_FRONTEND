import { useCountUp } from "../hooks/useCountUp";

function StatCard({
  title,
  value,
  color,
  icon: Icon,
  subtitle,
  progress,
}) {
  const animated = useCountUp(value);

  const isLoading =
    typeof value === "string" && value.includes("--");

  return (
    <div className="glass lift rounded-2xl p-6 border border-[var(--border)] hover:scale-[1.02] transition-all duration-300">

      <div className="flex items-start justify-between">

        <div>

          <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)]">
            {title}
          </p>

          {isLoading ? (
            <div className="skeleton h-10 w-24 mt-3"></div>
          ) : (
            <h2
              className={`font-display text-4xl font-bold mt-2 ${color}`}
            >
              {animated}
            </h2>
          )}

          {subtitle && (
            <p className="text-xs text-[var(--muted)] mt-2">
              {subtitle}
            </p>
          )}

        </div>

        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-[var(--surface-raised)] flex items-center justify-center">

            <Icon
              size={22}
              className={color}
            />

          </div>
        )}

      </div>

      {progress !== undefined && !isLoading && (

        <div className="mt-5">

          <div className="h-2 rounded-full bg-[var(--surface-raised)] overflow-hidden">

            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
}

export default StatCard;