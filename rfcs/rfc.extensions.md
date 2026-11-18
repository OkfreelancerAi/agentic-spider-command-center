# RFC: Commerce Extensions (Discounts, Bundles and Metering)

- Status: Draft
- Date: 2026-11-18

## Design

Extensions add optional checkout features without changing the meaning of the base payment requirement. Unknown mandatory extensions must cause checkout rejection; unknown optional extensions may be ignored only when the buyer and seller both permit it.

## Discount extension

A discount must specify:
- discount_id, issuer, eligible offer/customer scope
- fixed amount or percentage, currency/token basis
- start/end time, maximum redemptions, per-customer limit
- stacking rules and the final payable amount

The server recomputes the final amount. Never trust a client-calculated discounted total. Discounts cannot reduce a quote below the seller's authorized minimum or bypass payment verification.

## Metering and bundles

Usage-based services must define units, maximum spend, rate, measurement source, and a hard cap before work starts. Bundles must list included deliverables and expiry. Any increase in price or scope requires fresh buyer authorization.

## Acceptance criteria

The final amount is deterministic, visible before authorization, reproducible from the stored quote, and bound to the payment proof and order.
