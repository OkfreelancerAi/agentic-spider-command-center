import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side Otto x402 proxy.
 *
 * When X402_PRIVATE_KEY is set, uses the real @x402 client against
 * https://x402.ottoai.services (Full Auto + Meta-Intelligence).
 * Without a key, returns structured mocks so the UI stays fully testable.
 */

const BASE = "https://x402.ottoai.services";

async function liveOttoCall(mode: "meta" | "full-auto", ask: string, priceCapUsd: number) {
  const key = process.env.X402_PRIVATE_KEY;
  if (!key) return null;

  try {
    // Dynamic import so the route still builds if packages are not resolved in some envs
    const { default: axios } = await import("axios");
    const { wrapAxiosWithPaymentFromConfig } = await import("@x402/axios");
    const { ExactEvmScheme } = await import("@x402/evm");
    const { privateKeyToAccount } = await import("viem/accounts");

    const account = privateKeyToAccount(key as `0x${string}`);
    const api = wrapAxiosWithPaymentFromConfig(
      axios.create({
        baseURL: BASE,
        timeout: 90_000,
        validateStatus: (s) => s < 500,
      }),
      {
        schemes: [
          {
            network: "eip155:8453",
            client: new ExactEvmScheme(account),
          },
        ],
      }
    );

    if (mode === "meta") {
      const res = await api.post("/meta-intelligence", {
        ask,
        price_cap_usd: priceCapUsd,
        network: "eip155:8453",
      });
      if (res.status !== 200) {
        throw new Error(`Meta failed: ${res.status} ${JSON.stringify(res.data)}`);
      }
      return {
        otto_verified: res.data?.otto_verified ?? [],
        open_bazaar_candidates: res.data?.open_bazaar_candidates ?? [],
        applied_constraints: res.data?.applied_constraints,
        raw: res.data,
        paymentReceipt: res.headers?.["x-payment-receipt"] ?? null,
        live: true,
      };
    }

    // full-auto
    const res = await api.post("/full-auto", {
      ask,
      price_cap_usd: priceCapUsd,
    });
    if (res.status !== 200) {
      throw new Error(`Full Auto failed: ${res.status} ${JSON.stringify(res.data)}`);
    }
    return {
      data: res.data?.data ?? res.data,
      receipt: res.data?.receipt,
      callId: res.data?.call_id ?? res.data?.callId,
      raw: res.data,
      paymentReceipt: res.headers?.["x-payment-receipt"] ?? null,
      live: true,
    };
  } catch (e: any) {
    // Surface the error so the client can show it; do not silently fall back
    throw new Error(e?.message || "Otto live call failed");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, ask, priceCapUsd = 0.05 } = body;

    if (!ask || typeof ask !== "string") {
      return NextResponse.json({ error: "ask is required" }, { status: 400 });
    }
    if (mode !== "meta" && mode !== "full-auto") {
      return NextResponse.json({ error: "unknown mode" }, { status: 400 });
    }

    // Prefer live path when key exists
    try {
      const live = await liveOttoCall(mode, ask, parsedCap);
      if (live) return NextResponse.json(live);
    } catch (liveErr: any) {
      // If key is present but call failed, return the error (do not mock)
      if (process.env.X402_PRIVATE_KEY) {
        return NextResponse.json(
          { error: liveErr.message || "live Otto error", live: false },
          { status: 502 }
        );
      }
    }

    // Mock path (no key configured)
    if (mode === "meta") {
      return NextResponse.json({
        otto_verified: [
          {
            name: "Crypto News",
            price_usd: 0.001,
            pay_url: "https://x402.ottoai.services/crypto-news",
            source: "otto",
            verification: "verified",
          },
          {
            name: "Token Alpha",
            price_usd: 0.005,
            pay_url: "https://x402.ottoai.services/token-alpha",
            source: "otto",
            verification: "verified",
          },
        ],
        open_bazaar_candidates: [],
        applied_constraints: { price_cap_usd: priceCapUsd, ask },
        raw: { mock: true, note: "Set X402_PRIVATE_KEY for live Otto payments" },
        live: false,
      });
    }

    return NextResponse.json({
      data: {
        summary: `Full Auto (mock) for: "${ask}"`,
        note: "Set X402_PRIVATE_KEY in Vercel env for real on-chain x402 settlement",
        timestamp: new Date().toISOString(),
      },
      callId: `mock-${Date.now()}`,
      raw: { mock: true },
      live: false,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "server error" }, { status: 500 });
  }
}
