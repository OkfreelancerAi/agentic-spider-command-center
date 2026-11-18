/**
 * Genius Strategy engine.
 * Only explicitly live, source-backed results count as evidence.
 */

export type GeniusStrategy = {
  id: string;
  goal: string;
  createdAt: number;
  thesis: string;
  timeHorizon: string;
  riskLevel: "low" | "moderate" | "elevated" | "high";
  keyDrivers: string[];
  entryCriteria: string[];
  exitCriteria: string[];
  monitoring: string[];
  spiderTopics: string[];
  confidence: number;
  nextActions: string[];
  evidence?: {
    sourcesUsed: number;
    highlights: string[];
    warnings: string[];
  };
};

export type SpiderEvidence = {
  topic: string;
  tasks: Array<{ id: string; topic: string; status: string; result?: any; error?: string }>;
};

function extractHighlights(swarm?: SpiderEvidence | null): { highlights: string[]; warnings: string[]; sources: number } {
  if (!swarm?.tasks?.length) return { highlights: [], warnings: [], sources: 0 };

  const highlights: string[] = [];
  const warnings: string[] = [];
  let sources = 0;

  for (const t of swarm.tasks) {
    if (t.status === "done" && t.result?.live === true && Array.isArray(t.result?.sources) && t.result.sources.length > 0) {
      sources += t.result.sources.length;
      const raw = JSON.stringify(t.result).slice(0, 160).replace(/\s+/g, " ");
      highlights.push(`[${t.id}] ${raw}`);
    } else if (t.status === "done") {
      warnings.push(`Simulation or unverified result only: ${t.id}; excluded from evidence score`);
    } else if (t.status === "error") {
      warnings.push(`Spider task failed: ${t.id}`);
    }
  }

  return { highlights: highlights.slice(0, 6), warnings: warnings.slice(0, 5), sources };
}

export function generateGeniusStrategy(
  goal: string,
  context?: string,
  swarm?: SpiderEvidence | null
): GeniusStrategy {
  const lower = goal.toLowerCase();
  const isDefensive = /protect|hedge|defensive|risk|safe/.test(lower);
  const isAggressive = /ape|moon|high risk|max|yolo/.test(lower);

  const { highlights, warnings, sources } = extractHighlights(swarm);

  // No verified source-backed evidence means low confidence, never a fabricated source count.
  let confidence = sources > 0 ? 0.4 : 0.25;
  if (sources >= 3) confidence += 0.12;
  if (sources >= 5) confidence += 0.08;
  if (warnings.length) confidence -= 0.04 * Math.min(warnings.length, 3);
  if (isAggressive) confidence -= 0.05;
  confidence = Math.max(0.1, Math.min(0.8, confidence));

  const thesisParts: string[] = [];
  if (context) thesisParts.push(`Context: ${context.slice(0, 200)}`);
  if (sources > 0) {
    thesisParts.push(`Strategy uses ${sources} independently identified source records from explicitly live results.`);
  } else {
    thesisParts.push(`Heuristic draft for "${goal}" only. No verified live source records were supplied; do not treat this as a market signal or trade instruction.`);
  }
  if (warnings.length) thesisParts.push(`Caution flags: ${warnings.join("; ")}.`);

  return {
    id: `genius-${Date.now()}`,
    goal,
    createdAt: Date.now(),
    thesis: thesisParts.join(" "),
    timeHorizon: isAggressive ? "hours–days" : isDefensive ? "weeks–months" : "days–weeks",
    riskLevel: warnings.length >= 2 ? "elevated" : isAggressive ? "high" : isDefensive ? "low" : "moderate",
    keyDrivers: [
      "Narrative velocity & KOL attention",
      "On-chain liquidity & holder distribution",
      "Macro / sector rotation signals",
      "Security & contract health",
      ...(sources > 0 ? ["Verified live source alignment"] : []),
    ],
    entryCriteria: [
      "Require attributable, timestamped sources",
      "Security screen clear (no honeypot / high tax flags)",
      "Liquidity above a measured minimum threshold",
      "Risk/reward ≥ 2.5× under stated invalidation",
      ...(warnings.length ? ["Resolve all simulation and risk warnings before relying on this strategy"] : []),
    ],
    exitCriteria: [
      "Thesis invalidated by data",
      "Trailing stop or target hit",
      "Sudden liquidity drain or security alert",
    ],
    monitoring: [
      "Timestamped news + KOL pulse",
      "Funding rates & open interest (if perps relevant)",
      "Wallet concentration changes",
      "Contract and liquidity risk",
    ],
    spiderTopics: [goal, `${goal} sentiment`, `${goal} liquidity`, `${goal} security`],
    confidence,
    nextActions: sources === 0
      ? [
          "Connect a real, attributable research provider before claiming live intelligence",
          "Publish a sample research brief with citations and timestamps",
          "Sell the brief only after delivery, buyer acceptance and verified settlement",
        ]
      : [
          "Review source records and warnings",
          "Confirm security + liquidity outputs independently",
          "Set explicit size & invalidation before any trade",
          "Log strategy ID for later evaluation",
        ],
    evidence: { sourcesUsed: sources, highlights, warnings },
  };
}
