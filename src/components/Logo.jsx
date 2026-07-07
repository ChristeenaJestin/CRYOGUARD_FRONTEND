function Logo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
        stroke="var(--ice)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M20 2V38" stroke="var(--ice)" strokeWidth="1.1" opacity="0.55" />
      <path d="M4 11L36 29" stroke="var(--ice)" strokeWidth="1.1" opacity="0.55" />
      <path d="M36 11L4 29" stroke="var(--ice)" strokeWidth="1.1" opacity="0.55" />
      <circle cx="20" cy="20" r="3.6" fill="var(--ice)" />
    </svg>
  );
}

export default Logo;
