// Ambient animated background — three soft, drifting frost-colored orbs.
// Purely decorative, `pointer-events-none`, and sits behind all content.
function FrostField() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="orb-a absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, var(--ice) 0%, transparent 70%)" }}
      />
      <div
        className="orb-b absolute top-1/3 -right-20 w-[360px] h-[360px] rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, var(--safe) 0%, transparent 70%)" }}
      />
      <div
        className="orb-c absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full blur-3xl opacity-10"
        style={{ background: "radial-gradient(circle, var(--ice-soft) 0%, transparent 70%)" }}
      />
    </div>
  );
}

export default FrostField;
