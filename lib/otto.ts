/**
 * Otto x402 orchestration helpers.
 * In production the private key lives only in the server environment.
 */

export type MetaResult = {
  otto_verified: any[];
  open_bazaar_candidates: any[];
  applied_constraints?: any;
  raw: any;
};

export type FullAutoResult = {
  data: any;
  receipt?: any;
  callId?: string;
  raw: any;
};

export async function callMetaIntelligence(
  ask: string,
  priceCapUsd = 0.05
): Promise<MetaResult> {
  // Client-side placeholder — real calls go through /api/otto
  const res = await fetch("/api/otto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "meta", ask, priceCapUsd }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function callFullAuto(
  ask: string,
  priceCapUsd = 0.05
): Promise<FullAutoResult> {
  const res = await fetch("/api/otto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "full-auto", ask, priceCapUsd }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
