# Aegisora Threat Model

## Status

**Security readiness artifact — active baseline**

This document describes the current threat model for the Aegisora runtime governance architecture.

## 1. Security Objective

Aegisora places a governance and security boundary between autonomous AI agents and the tools, providers, data stores, APIs, and external actions they can affect.

> No agent action should become an external system action without passing through the defined enforcement boundary.

Runtime decisions:

- `ALLOW`
- `BLOCK`
- `ESCALATE`

## 2. Assets

| Asset | Security objective |
|---|---|
| Agent identity | Integrity and authorization |
| Agent context | Confidentiality and integrity |
| Tool definitions | Integrity |
| Provider credentials | Confidentiality |
| Policy definitions | Integrity |
| Security decisions | Integrity and auditability |
| Audit records | Integrity and traceability |
| User/customer data | Confidentiality |
| Runtime configuration | Integrity |
| Plugin/integration metadata | Integrity |
| Build artifacts | Integrity |
| Package provenance | Integrity |

## 3. Trust Boundaries

### Boundary A — Agent Input

Untrusted agent-generated intent enters the runtime.

### Boundary B — Governance Pipeline

`Runtime Gateway` → `Request Interceptor` → `Context Analyzer` → `Security Engine` → `Policy Engine` → `Decision Engine` → `Enforcement Gate`

### Boundary C — Execution

Only approved actions may reach the execution/provider layer.

### Boundary D — External Systems

External providers, tools, APIs, databases, filesystems, MCP servers, framework integrations, and other external systems are security-sensitive execution targets.

## 4. Threat Categories

### T-01 Prompt Injection

Controls: context analysis, policy evaluation, tool authorization, execution enforcement.

### T-02 Indirect Prompt Injection

Controls: untrusted context classification, security analysis, policy enforcement.

### T-03 Tool Abuse

Controls: tool identity, policy checks, enforcement gate, audit records.

### T-04 Policy Bypass

Controls: centralized interception, enforcement boundary, explicit decision states, negative-path testing.

### T-05 Privilege Escalation

Controls: least privilege, identity-aware authorization, policy evaluation, escalation path.

### T-06 Data Exfiltration

Controls: context inspection, tool authorization, policy enforcement, audit trail.

### T-07 Credential Exposure

Controls: secret management, no credentials in source, least privilege, CI secret isolation.

### T-08 Malicious Plugin / Integration

Controls: plugin registration, execution boundary, package review, supply-chain controls.

### T-09 Supply-Chain Compromise

Controls: lockfile integrity, metadata validation, release workflow validation, npm trusted publishing, GitHub Actions provenance.

### T-10 Audit Tampering

Controls: centralized audit generation, controlled repository permissions, evidence retention.

### T-11 Agent-to-Agent Abuse

Controls: identity boundaries, policy evaluation, authorization, audit correlation.

### T-12 Runtime Enforcement Bypass

Controls: architectural execution boundary, negative-path testing, enforcement-gate coverage, regression testing.

## 5. Risk Rating

Threats use `Likelihood × Impact`.

| Rating | Definition |
|---|---|
| Critical | Direct path to unauthorized execution, credential compromise, major data loss, or remote compromise |
| High | Material security boundary failure |
| Medium | Limited impact or constrained exploitation |
| Low | Minor impact or difficult exploitation |

Critical and High findings require explicit remediation tracking.

## 6. Security Invariants

1. Unauthorized actions must not reach execution.
2. Policy violations must not reach providers.
3. Security decisions must be auditable.
4. Agent/tool identity must remain available to governance controls.
5. Release artifacts must not leak workspace-only dependency protocols.
6. Public package metadata must remain valid.
7. Security controls must fail closed where required.
8. High-risk actions must support human escalation.

## 7. Review Triggers

Review this model when execution architecture, provider classes, tool boundaries, integrations, authentication/authorization, incidents, vulnerabilities, or release architecture materially change.
