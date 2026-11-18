# RFC: Agentic Checkout for MIKA + SPIDER

- Status: Draft
- Date: 2026-11-18
- Scope: Base USDC service purchases; human- and agent-initiated checkout

## Problem

MIKA needs a predictable way to turn a qualified request into a paid, deliverable service. A checkout must describe the seller, service, price, network, token, recipient, expiry, refund/cancellation policy, and expected deliverable before a buyer authorizes payment.

## Proposal

1. SPIDER discovers and qualifies opportunities; it cannot charge a buyer.
2. MIKA presents a service offer with a stable offer ID, exact scope, fixed price, delivery window, and seller identity.
3. The buyer reviews the complete quote and explicitly authorizes the payment.
4. The payment handler verifies the payment requirement and settlement.
5. Work begins only after the payment is independently confirmed as settled.
6. MIKA records delivery evidence and the buyer's acceptance or dispute.
7. Revenue is recognized only from a verified settlement, net of refunds, fees, and any disclosed agent allocation.

## Required quote fields

- offer_id, seller_id, service_id, description, deliverable, price
- network_id, token_address, recipient, expiry
- cancellation/refund terms, delivery deadline, quote version
- idempotency key and a unique order ID

## Safety

Fail closed on missing or mismatched fields, expired quotes, wrong chain/token/recipient, underpayment, reused payment proofs, unavailable facilitator, or ambiguous settlement. No private key or signing authority is exposed to the browser. No payment is initiated without explicit buyer authorization.

## Acceptance criteria

- Quote preview is human-readable and immutable after authorization.
- Duplicate order/payment submissions cannot create duplicate work or revenue.
- Every paid order links to a verified settlement receipt and delivery record.
- Mock and testnet flows are visibly labelled and excluded from revenue totals.
