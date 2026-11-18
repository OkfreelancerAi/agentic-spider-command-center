# MIKA + SPIDER Revenue Commerce Profile

- Status: Experimental implementation profile
- Date: 2026-11-18
- Target: Base USDC, with testnet-first validation

## Release boundary

This profile is a design and implementation plan, not a declaration that live checkout, settlement, agent payouts, or revenue are operational.

## Minimum product loop

1. Publish one useful, narrowly scoped paid service.
2. Let SPIDER identify a qualified buyer/use case.
3. Let MIKA present a fixed quote and delivery promise.
4. Obtain explicit buyer authorization.
5. Verify and settle using the selected x402 implementation.
6. Deliver the work and retain evidence.
7. Reconcile the chain receipt and calculate seller/platform/agent accounting.
8. Ask for acceptance; handle refunds and disputes.

## Initial service candidate

Evidence-backed research brief or opportunity report. It should include source links, timestamp, method, limitations, and a concise recommendation. Do not sell speculative investment claims or fabricate findings.

## Mandatory records

Persist offers, quote versions, buyer authorization, order IDs, idempotency keys, payment requirements, verify/settle responses, chain receipts, delivery artifacts, acceptance/dispute/refund states, and accounting allocations.

## Environments

- Local/mock: simulation only; never included in revenue.
- Base Sepolia: test transactions only; never represented as commercial revenue.
- Base mainnet: disabled until all production gates pass and an authorized operator approves activation.

## Pricing

Prices are experiments, not established market rates. Validate willingness to pay with real customers before scaling. No revenue forecast is implied.
