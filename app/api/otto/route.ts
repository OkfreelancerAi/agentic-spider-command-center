import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side Otto proxy.
 * In production: use @x402/axios + private key from env to actually pay.
 * For now returns structured mock so the UI and commands work end-to-end.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, ask, priceCapUsd = 0.05 } = body;

    if (!ask || typeof ask !== "string") {
      return NextResponse.json({ error: "ask is required" }, { status: 400 });
    }

    // TODO: real x402 client here with process.env.X402_PRIVATE_KEY
    // const otto = new OttoOrchestrator(process.env.X402_PRIVATE_KEY);

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
        raw: { mock: true, note: "Replace with live x402 call" },
      });
    }

    if (mode === "full-auto") {
      return NextResponse.json({
        data: {
          summary: `Full Auto result for: "${ask}"`,
          note: "This is a mock. Wire real Otto Full Auto with your agent wallet key.",
          timestamp: new Date().toISOString(),
        },
        callId: `mock-${Date.now()}`,
        raw: { mock: true },
      });
    }

    return NextResponse.json({ error: "unknown mode" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "server error" }, { status: 500 });
  }
}
