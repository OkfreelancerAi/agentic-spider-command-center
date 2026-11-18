# RFC: Payment Handlers and Settlement Receipts

- Status: Draft
- Date: 2026-11-18
- Initial payment rail: Base USDC, subject to configuration and verification

## Responsibilities

A payment handler separates quote creation, payment verification, settlement, and accounting. It must never treat a 402 response, a submitted transaction, or a provider dashboard status as proof of revenue.

## Handler contract

- describeRequirements(quote) -> payment requirements
- verifyPayment(requirements, proof) -> verified / rejected
- settlePayment(verifiedPayment) -> settlement result
- reconcileSettlement(settlement) -> independently checked receipt
- recordLedgerEntry(receipt) -> idempotent accounting result

The concrete adapter must follow the exact x402 protocol and facilitator version in use. This RFC does not claim compatibility with every x402 release.

## Required checks

- exact chain/network, token contract, decimals, amount and recipient
- quote/order binding, expiry, payer where supported
- proof authenticity, replay prevention and idempotency
- facilitator availability and explicit verify/settle outcomes
- on-chain transaction receipt, successful status and matching transfer
- confirmation/finality policy appropriate to the chain

## Ledger states

created -> quoted -> authorized -> payment_pending -> settled -> work_in_progress -> delivered -> accepted

Alternative terminal states: rejected, expired, failed, refunded, disputed.

Only settled entries backed by a verified receipt may enter gross settled volume. Net recognized revenue must account for refunds, protocol/facilitator costs, seller obligations, and agent rewards.

## Security

Fail closed. Never log secrets or full private payment credentials. Use durable storage for orders, idempotency keys, receipts, disputes, and ledger entries. Reconcile from chain data; do not trust client-submitted transaction hashes alone.
