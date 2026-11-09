/**
 * Client helpers for Otto x402 (proxied through /api/otto).
 */

export type MetaResult = {
  otto_verified: any[];
  open_bazaar_candidates: any[];
  applied_constraints?: any;
  raw: any;
  live?: boolean;
  paymentReceipt?: string | null;
};

export type FullAutoResult = {
  data: any;
  receipt?: any;
  callId?: string;
  raw: any;
  live?: boolean;
  paymentReceipt?: string | null;
};

export async function callMetaIntelligence(
  ask: string,
  priceCapUsd = 0.05
): Promise<MetaResult> {
  const res = await fetch("/api/otto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "meta", ask, priceCapUsd }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || res.statusText);
  return json;
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
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || res.statusText);
  return json;
}
