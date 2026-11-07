/**
 * Spider-like crawler subagent system.
 * Launches parallel intel gathering tasks across Otto endpoints / topics.
 */

export type SpiderTask = {
  id: string;
  topic: string;
  status: "pending" | "running" | "done" | "error";
  result?: any;
  error?: string;
};

export type SpiderSwarm = {
  id: string;
  topic: string;
  tasks: SpiderTask[];
  createdAt: number;
};

export function createSpiderSwarm(topic: string): SpiderSwarm {
  const baseTasks = [
    { suffix: "news", prompt: `crypto news and sentiment for ${topic}` },
    { suffix: "alpha", prompt: `token alpha and why is ${topic} moving` },
    { suffix: "security", prompt: `is ${topic} safe to buy honeypot rug pull screen` },
    { suffix: "social", prompt: `KOL sentiment and twitter pulse for ${topic}` },
    { suffix: "defi", prompt: `DeFi yields liquidity and market risk around ${topic}` },
  ];

  return {
    id: `spider-${Date.now()}`,
    topic,
    createdAt: Date.now(),
    tasks: baseTasks.map((t, i) => ({
      id: `task-${i}-${t.suffix}`,
      topic: t.prompt,
      status: "pending" as const,
    })),
  };
}
