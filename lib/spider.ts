/**
 * Spider-like crawler subagent system.
 * Launches parallel intel gathering tasks and can feed Genius Strategy.
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

/** Run all spider tasks via Full Auto (or Meta) in parallel. */
export async function runSpiderSwarm(
  swarm: SpiderSwarm,
  runner: (ask: string) => Promise<any>,
  onUpdate?: (swarm: SpiderSwarm) => void
): Promise<SpiderSwarm> {
  const updated: SpiderSwarm = {
    ...swarm,
    tasks: swarm.tasks.map((t) => ({ ...t, status: "running" as const })),
  };
  onUpdate?.(updated);

  const results = await Promise.allSettled(
    updated.tasks.map(async (task) => {
      try {
        const result = await runner(task.topic);
        return { id: task.id, status: "done" as const, result };
      } catch (e: any) {
        return {
          id: task.id,
          status: "error" as const,
          error: e?.message || String(e),
        };
      }
    })
  );

  const finalTasks = updated.tasks.map((task, i) => {
    const r = results[i];
    if (r.status === "fulfilled") {
      return { ...task, ...r.value };
    }
    return {
      ...task,
      status: "error" as const,
      error: String(r.reason),
    };
  });

  const final: SpiderSwarm = { ...updated, tasks: finalTasks };
  onUpdate?.(final);
  return final;
}
