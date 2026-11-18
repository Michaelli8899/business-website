/**
 * Abstract hero composition: a wireframed web page (design) connected to a
 * small system of nodes (technology). Pure SVG — crisp at any size, no
 * image requests, and motion is limited to slow dash flows that switch off
 * under prefers-reduced-motion.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 560"
      role="img"
      aria-labelledby="hero-visual-title"
      className={className}
    >
      <title id="hero-visual-title">
        Abstract illustration of a website layout connected to a network of business systems.
      </title>
      <defs>
        <pattern id="hv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="var(--color-ink)" strokeOpacity="0.07" />
        </pattern>
        <linearGradient id="hv-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-canvas)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-canvas)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Blueprint field */}
      <rect width="600" height="560" fill="url(#hv-grid)" />
      <rect y="420" width="600" height="140" fill="url(#hv-fade)" />

      {/* Large architectural circle */}
      <circle cx="430" cy="210" r="168" fill="none" stroke="var(--color-line-strong)" />
      <circle cx="430" cy="210" r="118" fill="var(--color-accent-soft)" opacity="0.6" />

      {/* Connection paths */}
      <g fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M262 236 C 330 236, 350 132, 452 132" strokeDasharray="4 8" className="animate-flow" />
        <path d="M262 236 C 360 236, 380 300, 508 300" strokeDasharray="4 8" className="animate-flow" />
        <path d="M508 300 C 508 380, 460 420, 400 432" strokeDasharray="4 8" className="animate-flow" />
        <path d="M452 132 C 520 140, 540 220, 508 300" stroke="var(--color-line-strong)" />
      </g>

      {/* Browser window */}
      <g style={{ filter: "drop-shadow(0 24px 32px rgb(32 35 31 / 0.10))" }}>
        <rect x="40" y="72" width="300" height="236" rx="10" fill="var(--color-surface)" stroke="var(--color-line)" />
      </g>
      <path d="M40 98h300" stroke="var(--color-line)" />
      <g fill="var(--color-line-strong)">
        <circle cx="56" cy="85" r="3.5" />
        <circle cx="68" cy="85" r="3.5" />
        <circle cx="80" cy="85" r="3.5" />
      </g>
      <rect x="196" y="80" width="128" height="10" rx="5" fill="var(--color-canvas)" />

      {/* Page content */}
      <rect x="60" y="120" width="44" height="5" rx="2.5" fill="var(--color-accent)" />
      <rect x="60" y="136" width="150" height="14" rx="2" fill="var(--color-ink)" />
      <rect x="60" y="156" width="118" height="14" rx="2" fill="var(--color-ink)" />
      <rect x="60" y="182" width="138" height="5" rx="2.5" fill="var(--color-line-strong)" />
      <rect x="60" y="193" width="116" height="5" rx="2.5" fill="var(--color-line-strong)" />
      <rect x="60" y="226" width="72" height="22" rx="11" fill="var(--color-ink)" />
      <rect x="140" y="226" width="62" height="22" rx="11" fill="none" stroke="var(--color-line-strong)" />

      <rect x="226" y="120" width="96" height="128" rx="4" fill="var(--color-accent-soft)" />
      <circle cx="274" cy="168" r="24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
      <path d="M240 236 L274 196 L308 236 Z" fill="var(--color-accent)" opacity="0.85" />

      <g fill="var(--color-canvas)" stroke="var(--color-line)">
        <rect x="60" y="264" width="80" height="28" rx="3" />
        <rect x="150" y="264" width="80" height="28" rx="3" />
        <rect x="240" y="264" width="82" height="28" rx="3" />
      </g>

      {/* Source point on the CTA */}
      <circle cx="262" cy="236" r="5" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />

      {/* System nodes */}
      <Node x={452} y={132} label="Form" />
      <Node x={508} y={300} label="Assist" accent />
      <Node x={400} y={432} label="CRM" />

      {/* Review card */}
      <g transform="translate(64 360)">
        <g style={{ filter: "drop-shadow(0 16px 24px rgb(32 35 31 / 0.08))" }}>
          <rect width="236" height="128" rx="10" fill="var(--color-surface)" stroke="var(--color-line)" />
        </g>
        <text x="18" y="30" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.2" fill="var(--color-ink-soft)">
          REVIEW QUEUE
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(18 ${48 + i * 24})`}>
            <rect width="12" height="12" rx="3" fill={i < 2 ? "var(--color-accent)" : "none"} stroke="var(--color-accent)" />
            {i < 2 && <path d="M3 6.2l2.2 2.2L9.2 4" fill="none" stroke="var(--color-surface)" strokeWidth="1.6" />}
            <rect x="22" y="3" width={[120, 96, 104][i]} height="6" rx="3" fill={i < 2 ? "var(--color-line-strong)" : "var(--color-ink)"} />
          </g>
        ))}
        <rect x="170" y="94" width="48" height="18" rx="9" fill="var(--color-accent-soft)" />
        <text x="194" y="106.5" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fontWeight="600" fill="var(--color-accent-strong)">
          Approve
        </text>
      </g>

      {/* Small registration marks */}
      <g stroke="var(--color-ink)" strokeOpacity="0.35">
        <path d="M560 40v16M552 48h16" />
        <path d="M24 520v16M16 528h16" />
      </g>
    </svg>
  );
}

function Node({ x, y, label, accent = false }: { x: number; y: number; label: string; accent?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="30" fill={accent ? "var(--color-ink)" : "var(--color-surface)"} stroke={accent ? "none" : "var(--color-line-strong)"} />
      <circle r="38" fill="none" stroke="var(--color-accent)" strokeOpacity="0.35" className="origin-center animate-pulse-soft" style={{ transformBox: "fill-box" }} />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10.5"
        letterSpacing="0.6"
        fill={accent ? "var(--color-on-night)" : "var(--color-ink)"}
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}
