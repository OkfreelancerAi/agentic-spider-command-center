# Revenue Release Gates

Production checkout remains disabled until all applicable gates pass:

1. **Protocol:** pin exact x402 client/server/facilitator versions and document supported scheme/network.
2. **Identity:** authenticate buyer, seller, and operator; enforce least privilege.
3. **Quote:** bind exact service, amount, token, chain, recipient, expiry, and order ID.
4. **Payment:** test verify/settle success and all rejection paths.
5. **Replay:** durable idempotency and replay protection across restarts and concurrent requests.
6. **Settlement:** independently verify transaction status and matching token transfer on-chain.
7. **Accounting:** reconcile refunds, seller entitlement, platform fee, and agent reward.
8. **Delivery:** persist artifact hashes, provenance, acceptance, and dispute state.
9. **Payout:** separately authorize and verify each payout; no implied automatic transfer.
10. **Operations:** rate limits, spend caps, monitoring, incident response, backups, and rollback.
11. **Tests:** unit, integration, adversarial, and funded testnet end-to-end tests.
12. **Approval:** explicit owner approval before enabling Base mainnet or changing payout destinations.

A passing UI build is not proof that payment or revenue works.
