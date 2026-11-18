# Agentic Earning Readiness: MIKA × SPIDER

- Status: **Not yet eligible for live commercial earning**
- Scope: marketplace readiness, buyer trust, agent discoverability, paid work, settlement, and operator compliance.
- Rule: a feature is "earning-ready" only when a real buyer can understand the offer, authorize it safely, receive the promised work, and the accounting can prove what was earned and paid.

## 1. What the product can credibly offer

Start with one narrow service, not a generic "AI agent marketplace":

**Evidence-backed opportunity research brief**
- SPIDER gathers public, attributable source material.
- MIKA checks relevance, timestamps, provenance, and limitations.
- The buyer receives a fixed scope, price, deadline, and acceptance criteria before checkout.
- The deliverable contains source links, method, findings, uncertainty, and next actions.
- Investment, trading, legal, medical, or other high-impact recommendations must not be marketed as guaranteed outcomes.

Do not advertise automated profits, guaranteed alpha, guaranteed leads, or passive income.

## 2. Eligibility checklist

### A. Product and buyer value
- [ ] Public landing page explains the problem, target buyer, deliverable, price basis, turnaround, limits, and support contact.
- [ ] At least one real, repeatable service has a sample deliverable and objective acceptance criteria.
- [ ] Price and refund/cancellation terms are shown before buyer authorization.
- [ ] Customer interviews or paid pilot evidence validate willingness to pay; clicks and waitlist signups alone are not revenue.
- [ ] Clear separation between free demo, mock mode, testnet, and paid production.

### B. Agent identity and discoverability
- [ ] Stable agent ID, operator/seller identity, contact route, versioned capability manifest, task schemas, supported languages, availability, and service limits.
- [ ] Capability claims are backed by reproducible examples and attributable completed-job evidence.
- [ ] Publish an agent endpoint/card or registry listing only after its metadata, security contact, and service terms are maintained.
- [ ] Define agent-to-agent discovery/negotiation adapter for the exact target ecosystem; do not claim ACP conformance until validated against a pinned official ACP release.
- [ ] Permissions are least-privilege and task-scoped; capability metadata never grants spending, signing, publishing, or private-data access.

### C. Checkout and payment
- [ ] Choose and pin the exact production checkout standard/API version and payment rail. Document whether this is ACP checkout, x402, or a carefully tested bridge; they are not interchangeable by assumption.
- [ ] Implement buyer authentication, seller authentication, immutable quote, order binding, explicit buyer approval, expiry, idempotency, and durable replay protection.
- [ ] Verify exact network, token contract, decimals, amount, recipient, payer constraints where applicable, and facilitator response.
- [ ] Independently reconcile a successful on-chain receipt and matching token transfer before marking settled.
- [ ] Implement refunds, failed/expired orders, disputes, duplicate callbacks, partial delivery, and service outage behavior.
- [ ] Never expose private keys or reusable payment credentials to browser code, manifests, logs, or public examples.

### D. Fulfillment and trust
- [ ] Dispatch work only after verified settlement (or a separately documented, explicitly approved credit policy).
- [ ] Persist source provenance, timestamps, methodology, output hash, delivery timestamp, and version.
- [ ] Add buyer acceptance, revision limits, dispute path, refund decision, and support response target.
- [ ] Track quality, completion rate, on-time delivery, refunds, chargebacks/disputes, and repeat purchase rate using attributable orders.
- [ ] Publish privacy notice, terms, refund policy, acceptable-use rules, retention/deletion process, and incident contact.

### E. Seller, business, and payout readiness
- [ ] Confirm the legal operator/seller, business form, invoicing obligations, tax/VAT treatment, consumer rights, privacy obligations, sanctions screening, and any required licenses with qualified local advisers for the markets served.
- [ ] Confirm payment provider onboarding, identity/business verification, supported countries, prohibited-business rules, and payout eligibility directly with the provider.
- [ ] Use a verified seller-owned payout destination and document ownership/authorization; changing it requires step-up verification and explicit approval.
- [ ] Disclose seller proceeds, platform fee, agent reward, network/provider costs, refund reserve, and conditions before purchase.
- [ ] Keep accrued rewards separate from paid-out rewards; record payout transaction IDs and reconcile each transfer.
- [ ] Do not pool, custody, transmit, or promise escrow of customer funds unless the legal and provider requirements for that model are met.

### F. Operations and security
- [ ] Patch Next.js to a Vercel-approved secure version and resolve the current vulnerable-version deployment block.
- [ ] Lock dependencies and use reproducible CI installs; run typecheck, lint, build, unit, integration, and adversarial tests.
- [ ] Use durable database transactions/unique constraints for orders, idempotency keys, settlement receipts, ledger entries, refunds, and payouts.
- [ ] Add rate limits, abuse detection, per-user spend limits, provider timeout/retry policy, secret rotation, audit logs, backups, alerts, and rollback.
- [ ] Run a funded testnet end-to-end exercise and a separately authorized, low-value mainnet pilot only after all gates pass.
- [ ] Obtain explicit operator approval before enabling mainnet payments, production payouts, or changing recipient addresses.

## 3. What is currently missing in this repository

Based on the inspected source and current release-gate documentation:
1. **Production payment is locked:** the Otto route deliberately returns `LIVE_PAYMENT_SAFETY_GATE` when a server payment key is configured; without the key it returns mocks.
2. **No durable commerce ledger is evidenced:** order, quote, authorization, replay, settlement, refund, and payout persistence still need implementation and tests.
3. **No complete public merchant offer is evidenced:** create a live landing page with real seller identity, service terms, sample output, support, privacy, and refund details.
4. **ACP is not integrated or certified:** current schemas are project-specific ACP-inspired examples, not official ACP schemas or a tested ACP adapter.
5. **Agent identity and reputation are incomplete:** manifest schema exists, but public registration/discovery, authenticated ownership, signed attestations, and attributable job reputation are not yet proven.
6. **No real settlement or payout proof is established:** test/mock outputs must not appear as revenue; a verified mainnet receipt and payout are still separate milestones.
7. **Production deployment is blocked:** the previously inspected Vercel build flagged Next.js 15.0.3 as vulnerable. Upgrade and revalidate before promotion as a live service.
8. **Commercial compliance is unverified:** seller/provider onboarding, Belgium/EU and target-market obligations, VAT/invoicing, privacy, consumer cancellation/refunds, and prohibited-business rules need review.

## 4. Measurable launch gates

Do not call the app "earning-ready" until all are true:
- A real customer can buy one defined service at a disclosed price.
- The buyer explicitly authorizes the exact immutable order.
- The provider/facilitator verifies and settles the exact payment.
- A durable, replay-safe ledger reconciles the chain receipt.
- The promised deliverable is submitted and acceptance/dispute is recorded.
- Refund and payout paths are tested and reconciled.
- Seller/platform/agent allocations match a signed, versioned agreement.
- Security, legal/provider onboarding, monitoring, and production deployment gates are approved.

## 5. Suggested execution order

1. Fix the vulnerable Next.js deployment and make CI reproducible.
2. Build the real seller/service page and one sample research deliverable.
3. Add authenticated agent registration and public capability discovery.
4. Implement durable order + idempotency + settlement ledger.
5. Add a version-pinned ACP adapter only if the chosen buyer/merchant ecosystem requires ACP; keep x402 as a distinct payment adapter.
6. Complete testnet adversarial tests, refunds, and payout reconciliation.
7. Conduct a small, explicitly approved production pilot; publish only independently verified metrics.

**Current public claim:** "MIKA × SPIDER is an experimental agent-commerce command center with a proposed paid research workflow. Live checkout and verified earnings are not yet enabled."
