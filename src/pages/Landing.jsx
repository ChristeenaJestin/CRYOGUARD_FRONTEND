import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  Thermometer,
  Radio,
  Route as RouteIcon,
  ShieldCheck,
  Syringe,
  Droplet,
  Snowflake,
  ArrowUpRight,
} from "lucide-react";
import FrostField from "../components/FrostField";
import Reveal from "../components/Reveal";

const cargoClasses = [
  {
    icon: Syringe,
    label: "Vaccines",
    range: "2°C – 8°C",
  },
  {
    icon: Droplet,
    label: "Blood Plasma",
    range: "2°C – 8°C",
  },
  {
    icon: Snowflake,
    label: "Medicines",
    range: "2°C – 8°C",
  },
];

const modules = [
  {
    tag: "MODULE — TRACKING",
    icon: Radio,
    title: "Live fleet telemetry",
    body: "Every reefer truck streams temperature, humidity, speed and position on a rolling interval, so a shipment's condition is never more than a few seconds stale.",
  },
  {
    tag: "MODULE — PREDICTION",
    icon: Thermometer,
    title: "Breach forecasting",
    body: "Instead of alerting after a threshold is crossed, the model projects each trace forward and flags the shipments trending toward failure while there's still time to act.",
  },
  {
    tag: "MODULE — RESPONSE",
    icon: RouteIcon,
    title: "Nearest cold hub routing",
    body: "The moment a truck is flagged, the platform surfaces the closest cold-storage hub and the corridor to reach it, turning a warning into a next step.",
  },
];

function Hero() {
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const node = glowRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <FrostField />
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-12 grid md:grid-cols-2 gap-14 items-center relative">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--safe)] live-dot" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)]">
              17 cold hubs · 5 vehicles online
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08] tracking-tight text-[var(--frost)]">
            Know a shipment
            <br />
            will fail <span className="text-[var(--ice)]">before it does.</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-[var(--muted)] max-w-lg leading-relaxed">
           CRYOGUARD watches every degree of the cold chain — vaccines, blood plasma,
           and medicines — forecasting thermal breaches before they happen while
           guiding operators to the nearest cold hub. 
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--ice)] text-[#04141c] font-semibold text-sm hover:bg-[var(--ice-soft)] transition-colors"
            >
              Open live dashboard
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              to="/reports"
              className="px-6 py-3.5 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--frost)] hover:bg-[var(--surface)] transition-colors"
            >
              View reports
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            {cargoClasses.map(({ icon: Icon, label, range }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={16} className="text-[var(--ice)]" />
                <div className="leading-tight">
                  <p className="text-sm font-medium text-[var(--frost)]">{label}</p>
                  <p className="font-mono text-[11px] text-[var(--muted)]">{range}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signature element: predictive breach trace */}
        <div className="reveal" style={{ animationDelay: "0.15s" }}>
          <div
            ref={glowRef}
            onMouseMove={handleMouseMove}
            className="group glass-strong relative overflow-hidden rounded-2xl p-6 md:p-7"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(53, 199, 240, 0.12), transparent 70%)",
              }}
            />
            <div className="relative flex items-center justify-between mb-5">
              <div>
                <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)]">
                  TRK-002 · Blood Samples
                </p>
                <p className="font-display text-lg font-semibold text-[var(--frost)] mt-0.5">
                  Thermal trace
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[var(--critical-dim)] text-[var(--critical)] font-mono text-[11px] font-medium">
                PREDICTED BREACH
              </span>
            </div>

            <div className="relative">
              <svg viewBox="0 0 600 220" className="w-full h-auto" aria-hidden="true">
                <defs>
                  <linearGradient id="traceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--ice)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--ice)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* threshold line at 8°C */}
                <line
                  x1="0"
                  y1="60"
                  x2="600"
                  y2="60"
                  stroke="var(--critical)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  opacity="0.55"
                />
                <text x="4" y="52" className="font-mono" fontSize="11" fill="var(--critical)" opacity="0.85">
                  8°C safe limit
                </text>

                <path
                  d="M0,180 L600,180 L600,20 L520,40 L460,58 L400,80 L320,110 L240,140 L160,150 L80,165 L0,180 Z"
                  fill="url(#traceFill)"
                  opacity="0.5"
                />
                <path
                  d="M0,180 L80,165 L160,150 L240,140 L320,110 L400,80 L460,58 L520,40 L600,20"
                  fill="none"
                  stroke="var(--ice)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="trace-path"
                />

                <circle cx="460" cy="58" r="5.5" fill="var(--frost)" stroke="var(--critical)" strokeWidth="2.5" />
                <circle cx="460" cy="58" r="5.5" fill="none" stroke="var(--critical)" strokeWidth="1.5">
                  <animate attributeName="r" values="5.5;18;5.5" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
                </circle>
              </svg>

              <div
                className="absolute px-2.5 py-1.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] shadow-lg"
                style={{ left: "72%", top: "6%" }}
              >
                <p className="font-mono text-[10px] text-[var(--muted)] leading-none mb-1">
                  ETA TO BREACH
                </p>
                <p className="font-mono text-sm font-semibold text-[var(--critical)] leading-none">
                  13:00
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border-soft)] flex items-center gap-2">
              <ShieldCheck size={15} className="text-[var(--ice)]" />
              <p className="text-xs text-[var(--muted)]">
                Recommendation ready — nearest cold hub is 2.4 km away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-24">
      <div className="max-w-xl mb-14">
        <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--ice)] mb-3">
          How it watches the chain
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[var(--frost)]">
          Three systems, one console.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {modules.map(({ tag, icon: Icon, title, body }, index) => (
          <Reveal key={title} delay={index * 100} className="glass lift rounded-2xl p-7">
            <div className="w-10 h-10 rounded-lg bg-[var(--ice-dim)] flex items-center justify-center mb-6">
              <Icon size={18} className="text-[var(--ice)]" />
            </div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] mb-2">
              {tag}
            </p>
            <h3 className="font-display text-lg font-semibold text-[var(--frost)] mb-2.5">
              {title}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--frost)]">
            The console is live.
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm max-w-md">
            Step into the dashboard to see the fleet, the forecast, and every
            active alert in real time.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--ice)] text-[#04141c] font-semibold text-sm hover:bg-[var(--ice-soft)] transition-colors"
        >
          Open live dashboard
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <main className="page-transition">
      <Hero />
      <Modules />
      <ClosingCTA />
    </main>
  );
}

export default Landing;
