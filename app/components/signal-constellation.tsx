"use client";

export default function SignalConstellation() {
  return (
    <div className="signal-orbit relative aspect-[1.35] w-full overflow-hidden rounded-[2rem] border border-cyan-200/10 bg-[#090e1c]/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,.13),transparent_42%),radial-gradient(circle_at_75%_25%,rgba(139,92,246,.18),transparent_35%)]" />
      <svg viewBox="0 0 560 410" className="relative h-full w-full" role="img" aria-label="Abstract MIKA and SPIDER agent network visualization">
        <defs>
          <linearGradient id="signalLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity=".05" />
            <stop offset="48%" stopColor="#a78bfa" stopOpacity=".8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity=".12" />
          </linearGradient>
          <radialGradient id="signalCore">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="30%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="url(#signalLine)" strokeWidth="1.2">
          <path d="M280 205 112 86 72 228 182 335 280 205 444 92 490 240 376 338 280 205" />
          <path d="M112 86 280 205 444 92M72 228 280 205 490 240M182 335 280 205 376 338" strokeDasharray="4 8" />
          <path d="M112 86 182 335M444 92 376 338M72 228 490 240" opacity=".35" />
          <circle cx="280" cy="205" r="116" opacity=".25" strokeDasharray="2 9" />
          <circle cx="280" cy="205" r="166" opacity=".16" strokeDasharray="2 12" />
        </g>
        <circle cx="280" cy="205" r="82" fill="url(#signalCore)" opacity=".75" />
        <circle cx="280" cy="205" r="31" fill="#0c1c30" stroke="#67e8f9" strokeOpacity=".8" />
        <circle cx="280" cy="205" r="22" fill="#0e7490" fillOpacity=".35" stroke="#a5f3fc" strokeOpacity=".35" />
        <text x="280" y="201" textAnchor="middle" fill="#ecfeff" fontSize="13" fontWeight="700" letterSpacing="2">MIKA</text>
        <text x="280" y="216" textAnchor="middle" fill="#a5f3fc" fontSize="7" letterSpacing="1.5">EXECUTOR</text>
        {[
          [112,86,"SPIDER","SCOUT"],
          [444,92,"SIGNAL","INTEL"],
          [72,228,"VERIFY","PROOF"],
          [490,240,"AGENTS","SWARM"],
          [182,335,"PAY","X402"],
          [376,338,"TRUST","SCORE"],
        ].map(([x,y,label,sub]) => (
          <g key={label as string}>
            <circle cx={x as number} cy={y as number} r="18" fill="#101a2b" stroke="#67e8f9" strokeOpacity=".5" />
            <circle cx={x as number} cy={y as number} r="4" fill="#67e8f9" />
            <text x={x as number} y={(y as number) + 34} textAnchor="middle" fill="#e4e4e7" fontSize="9" fontWeight="600" letterSpacing="1">{label as string}</text>
            <text x={x as number} y={(y as number) + 46} textAnchor="middle" fill="#71717a" fontSize="7" letterSpacing="1.3">{sub as string}</text>
          </g>
        ))}
        <circle className="signal-pulse" cx="280" cy="205" r="50" fill="none" stroke="#67e8f9" strokeWidth="1" />
        <circle cx="280" cy="205" r="3" fill="#fff" />
      </svg>
      <div className="absolute right-4 top-4 rounded-lg border border-violet-300/20 bg-violet-400/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[.18em] text-violet-200">Wicked Genius Engine</div>
      <div className="absolute bottom-4 right-4 text-right">
        <div className="text-[9px] uppercase tracking-[.2em] text-zinc-500">Signal mesh</div>
        <div className="font-mono text-xs text-cyan-200">LIVE UI · DATA-GATED</div>
      </div>
    </div>
  );
}
