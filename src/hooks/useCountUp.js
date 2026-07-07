import { useEffect, useRef, useState } from "react";

// Animates a numeric value counting up whenever `value` changes.
// Non-numeric or missing values pass through untouched (e.g. "--").
export function useCountUp(value, duration = 900) {
  const [display, setDisplay] = useState(value);
  const frame = useRef(null);

  useEffect(() => {
    const match = typeof value === "string" ? value.match(/-?\d+(\.\d+)?/) : null;
    const numeric = typeof value === "number" ? value : match ? parseFloat(match[0]) : null;

    if (numeric === null || Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const prefix = typeof value === "string" ? value.slice(0, match.index) : "";
    const suffix = typeof value === "string" ? value.slice(match.index + match[0].length) : "";
    const decimals = (match?.[1]?.length ?? 1) - 1;

    const start = performance.now();
    const from = 0;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (numeric - from) * eased;
      setDisplay(`${prefix}${current.toFixed(decimals < 0 ? 0 : decimals)}${suffix}`);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    }

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
}
