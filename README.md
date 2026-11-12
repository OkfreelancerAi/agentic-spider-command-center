# Agentic Spider Command Center

**Owner-locked agentic intelligence & strategy platform**

- **Owner Wallet**: `0xF4BAaf1D85753A857Aa9C4AeBa877D7864bE48aA`
- **Farcaster**: @badman666
- **X / Twitter**: @okfreelancer
- **GitHub**: OkfreelancerAi

## Features

- Hard owner wallet lock (only the owner address gets full privileges)
- Brilliant command bar (`/full-auto`, `/meta`, `/spider`, `/optimize`, `/genius`, `/collab` ...)
- Otto x402 Full Auto + Meta-Intelligence orchestration
- Spider-like crawler subagents for parallel market intel
- Collaboration rooms (multi-agent / multi-human missions)
- **Genius Strategy** module — AI-generated strategy blueprints with on-chain validation hooks
- Ready for real x402 payments and future transaction monitoring

## Micropayment safety status

The UI includes an indicative Base USDC service menu. It is **not currently chargeable**. The live Otto payment route fails closed whenever a server-side agent key is configured because owner authentication, durable replay protection, and settlement reconciliation are not yet implemented. Without a key, the route returns clearly marked mock output only. Mock output is not revenue.

The current Vercel deployment previously failed dependency installation because the repository requested unavailable `@x402/axios@^0.3.0`. The SDK dependencies are aligned to the published x402 v2 package line; this does not itself prove facilitator support or a successful payment.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your X402_PRIVATE_KEY (low-balance agent wallet recommended)
npm run dev
```

## Deploy

Push to `main` → connect the repo on Vercel → set environment variables → go live.

## Commands

| Command | Description |
|---------|-------------|
| `/connect` | Connect wallet |
| `/full-auto <ask>` | Otto Full Auto (pays best service for you) |
| `/meta <ask>` | Meta-Intelligence recommendations only |
| `/spider <topic>` | Launch parallel crawler subagents |
| `/optimize` | Optimize latest intel into actionable plan |
| `/genius <goal>` | Generate Genius Strategy blueprint |
| `/collab create` | Create shared mission room |
| `/collab join <id>` | Join room |
| `/receipts` | Show recent x402 receipts |
| `/cap <usd>` | Set session spend ceiling |

Built for real on-chain validated movements and agentic collaboration.
