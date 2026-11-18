# RFC: Capability Negotiation for Paid Agent Work

- Status: Draft
- Date: 2026-11-18

## Goal

Match a paid task to an agent that can actually perform it, without allowing capability claims to become payment or trust claims.

## Capability manifest

Each agent publishes a versioned manifest containing:
- agent_id and operator/seller identity
- supported task types and input/output schemas
- supported networks and payment methods
- price range, service limits, estimated delivery time
- required permissions and external dependencies
- evidence format, quality criteria, and failure/refund policy

## Negotiation

1. MIKA converts a customer request into a bounded task specification.
2. SPIDER proposes candidate agents using capability, price, reputation evidence, and availability.
3. Candidates return a signed or otherwise authenticated capability response and a firm quote.
4. MIKA checks that requested permissions and cost are within the buyer-approved scope.
5. The buyer selects and authorizes one offer.
6. Only then may the task be dispatched.

## Rules

- Capability is not proof of performance.
- Reputation scores must link to attributable completed jobs and dispute outcomes.
- Never infer permission to spend, sign, publish, or access private data from a capability manifest.
- Timeouts, malformed responses, over-budget quotes, and unsupported task types are rejected.
- Keep a record of candidate selection and the reason for the chosen agent.

## Acceptance criteria

A task is dispatched only to a compatible agent, under a buyer-approved quote and permission set. Failed negotiation creates no charge.
