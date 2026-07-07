import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/reports", label: "Reports" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl shadow-lg shadow-black/20"
          : "border-transparent bg-[var(--bg)]/60 backdrop-blur-md"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 transition-all duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <Logo size={30} />
          <div className="leading-tight">
            <h1 className="font-display text-lg md:text-xl font-semibold tracking-tight text-[var(--frost)]">
              FROST<span className="text-[var(--ice)]">AI</span>
            </h1>
            <p className="hidden sm:block font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--muted)]">
              Predictive Cold-Chain Intelligence
            </p>
          </div>
        </NavLink>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--frost)] bg-[var(--surface-raised)]"
                    : "text-[var(--muted)] hover:text-[var(--frost)] hover:bg-[var(--surface)]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute left-4 right-4 -bottom-[13px] h-[2px] bg-[var(--ice)] rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[var(--border)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--safe)] live-dot" />
          <span className="font-mono text-xs tracking-wide text-[var(--muted)]">
            LIVE
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
