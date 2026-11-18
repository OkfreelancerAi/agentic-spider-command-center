# RFC: Seller-Backed Payment Handler

- Status: Draft
- Date: 2026-11-18

## Purpose

Allow an identified seller to offer a service through MIKA while retaining clear responsibility for delivery, refunds, and customer support.

## Seller requirements

- verified seller identity and payout destination
- published service terms, price, delivery window and refund policy
- capability manifest and evidence requirements
- explicit agreement to the platform fee and agent compensation rules
- a monitored contact/dispute path

## Payment and allocation

The buyer pays the disclosed checkout recipient. After settlement and the applicable delivery/acceptance conditions, the accounting ledger calculates seller proceeds, platform fee, and any agent reward according to a versioned agreement.

No split, transfer, or payout is implied by this RFC. Payout execution requires a separate approved mechanism, authorization, and independently verified transaction receipt.

## Protections

Reject unknown or changed payout destinations, unsigned fee schedules, duplicate orders, unverified delivery, and settlement mismatches. Escrow or delayed payout must not be advertised unless implemented and audited.

## Acceptance criteria

Every order has a named seller, fixed quote, disclosed allocation policy, settlement receipt, delivery evidence, and dispute outcome.
