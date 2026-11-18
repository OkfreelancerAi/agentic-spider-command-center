# Example: Paid Research Brief

This is a product-flow example, not a live offer or payment endpoint.

## Offer

- Service: Evidence-backed opportunity research brief
- Seller: MIKA platform operator (identity and payout routing must be configured)
- Agent: SPIDER research worker (agent identity and reward agreement must be configured)
- Deliverable: concise brief with sources, timestamps, findings, risks, and next actions
- Price: set per quote; no hardcoded live price in this example
- Network/token/recipient: must be supplied from verified deployment configuration
- Delivery: deadline and acceptance criteria fixed in the quote

## Flow

1. SPIDER gathers candidate sources and records provenance.
2. MIKA reviews quality and prepares a quote.
3. Buyer sees scope, total, delivery time, seller, refund terms, and network.
4. Buyer explicitly authorizes payment.
5. Payment adapter verifies and settles.
6. Backend reconciles the transaction and stores a receipt.
7. Research agent completes the brief.
8. MIKA validates the deliverable and submits it.
9. Buyer accepts or opens a dispute.
10. Ledger calculates the agreed seller/platform/agent allocation. Any actual payout is a separate authorized transaction.

## Failure behavior

No payment, no dispatch, no earnings entry when the quote is expired, the payment is underfunded, the recipient/token/network mismatches, verification fails, settlement is uncertain, or replay is detected.
