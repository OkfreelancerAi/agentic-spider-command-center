/**
 * Genius Strategy engine.
 * Fuses a high-level goal with live spider swarm results into an actionable blueprint.
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
  /** Evidence pulled from spider / Otto when available */
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
    if (t.status === "done" && t.result) {
      sources += 1;
      const raw = typeof t.result === "string" ? t.result : JSON.stringify(t.result);
      const snippet = raw.slice(0, 160).replace(/\s+/g, " ");
      highlights.push(`[${t.id}] ${snippet}${raw.length > 160 ? "…" : ""}`);

      if (/honeypot|rug|scam|high tax|can't sell|depeg|stress/i.test(raw)) {
        warnings.push(`Risk signal in ${t.id}`);
      }
    } else if (t.status === "error") {
      warnings.push(`Spider task failed: ${t.id}`);
    }
  }

  return { highlights: highlights.slice(0, 6), warnings: warnings.slice(0, 4), sources };
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

  let confidence = 0.55;
  if (sources >= 3) confidence += 0.12;
  if (sources >= 5) confidence += 0.08;
  if (warnings.length) confidence -= 0.08 * Math.min(warnings.length, 3);
  if (isAggressive) confidence -= 0.05;
  confidence = Math.max(0.25, Math.min(0.92, confidence));

  const thesisParts: string[] = [];
  if (context) thesisParts.push(`Context: ${context.slice(0, 200)}`);
  if (sources > 0) {
    thesisParts.push(
      `Spider swarm returned ${sources} live source(s). Strategy is conditioned on that evidence.`
    );
  } else {
    thesisParts.push(
      `Primary thesis from goal "${goal}". Run /spider first for higher-confidence fusion.`
    );
  }
  if (warnings.length) {
    thesisParts.push(`Caution flags: ${warnings.join("; ")}.`);
  }

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
      ...(sources > 0 ? ["Live spider multi-source alignment"] : []),
    ],
    entryCriteria: [
      "Spider swarm confirms multi-source alignment",
      "Security screen clear (no honeypot / high tax flags)",
      "Liquidity above minimum threshold",
      "Risk/reward ≥ 2.5× under stated invalidation",
      ...(warnings.length ? ["All active risk flags reviewed and accepted"] : []),
    ],
    exitCriteria: [
      "Thesis invalidated by data",
      "Trailing stop or target hit",
      "Sudden liquidity drain or security alert",
    ],
    monitoring: [
      "Hourly news + KOL pulse via spider",
      "Funding rates & open interest (if perps relevant)",
      "Wallet concentration changes",
      "Otto market-risk composite",
    ],
    spiderTopics: [goal, `${goal} sentiment`, `${goal} liquidity`, `${goal} security`],
    confidence,
    nextActions:
      sources === 0
        ? [
            `Run /spider ${goal}`,
            "Re-run /genius after spider completes",
            "Set explicit size & invalidation before any movement",
          ]
        : [
            "Review spider highlights & warnings below",
            "Confirm security + liquidity outputs",
            "Set explicit size & invalidation",
            "Log strategy ID for later evolution",
            warnings.length ? "Address risk flags before size-up" : "Optional: /optimize for re-rank",
          ],
    evidence:
      sources > 0 || warnings.length
        ? { sourcesUsed: sources, highlights, warnings }
        : undefined,
  };
}
