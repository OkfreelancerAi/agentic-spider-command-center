/**
 * Genius Strategy engine.
 * Turns a high-level goal + current intel into a structured, actionable strategy blueprint.
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
};

export function generateGeniusStrategy(goal: string, context?: string): GeniusStrategy {
  // Lightweight deterministic scaffold — replace / enrich with LLM or Otto later
  const lower = goal.toLowerCase();
  const isDefensive = /protect|hedge|defensive|risk/.test(lower);
  const isAggressive = /ape|moon|high risk|max/.test(lower);

  return {
    id: `genius-${Date.now()}`,
    goal,
    createdAt: Date.now(),
    thesis: context
      ? `Based on current intel: ${context.slice(0, 180)}...`
      : `Primary thesis derived from goal: "${goal}". Focus on asymmetric opportunity with clear invalidation.`,
    timeHorizon: isAggressive ? "hours–days" : isDefensive ? "weeks–months" : "days–weeks",
    riskLevel: isAggressive ? "high" : isDefensive ? "low" : "moderate",
    keyDrivers: [
      "Narrative velocity & KOL attention",
      "On-chain liquidity & holder distribution",
      "Macro / sector rotation signals",
      "Security & contract health",
    ],
    entryCriteria: [
      "Spider swarm confirms multi-source alignment",
      "Security screen clear (no honeypot / high tax flags)",
      "Liquidity above minimum threshold",
      "Risk/reward ≥ 2.5× under stated invalidation",
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
    spiderTopics: [
      goal,
      `${goal} sentiment`,
      `${goal} liquidity`,
      `${goal} security`,
    ],
    confidence: 0.62,
    nextActions: [
      `Run /spider ${goal}`,
      "Review security + liquidity outputs",
      "Set explicit size & invalidation before any movement",
      "Log strategy ID for later evolution",
    ],
  };
}
