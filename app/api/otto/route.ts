import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side Otto x402 proxy.
 *
 * The live client is retained for the future authenticated integration.
 * The public route currently fails closed when a payment key is configured;
 * without a key it returns structured mocks for UI testing.
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

    const parsedCap = Number(priceCapUsd);
    if (!Number.isFinite(parsedCap) || parsedCap <= 0 || parsedCap > 0.05) {
      return NextResponse.json({ error: "priceCapUsd must be greater than 0 and no more than 0.05 USD" }, { status: 400 });
    }
    if (ask.length > 2000) {
      return NextResponse.json({ error: "ask must be 2000 characters or fewer" }, { status: 400 });
    }

    // Fail closed: this public endpoint has no durable owner-auth or replay store.
    // Never let an unauthenticated request spend the server-side agent wallet.
    if (process.env.X402_PRIVATE_KEY) {
      return NextResponse.json(
        {
          error: "Live micropayments are locked until owner authentication, durable replay protection and settlement reconciliation are implemented.",
          code: "LIVE_PAYMENT_SAFETY_GATE",
          live: false,
        },
        { status: 503 }
      );
    }

    // Explicit mock path only (no server-side payment key configured)
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
        applied_constraints: { price_cap_usd: parsedCap, ask },
        raw: { mock: true, note: "Mock only. Live payments are fail-closed pending owner authentication and a durable settlement ledger." },
        live: false,
      });
    }

    return NextResponse.json({
      data: {
        summary: `Full Auto (mock) for: "${ask}"`,
        note: "Mock only. No payment was attempted and no earnings were created.",
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
