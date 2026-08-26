# Aegisora Incident Response

## Purpose

Baseline incident lifecycle for security events affecting Aegisora software, infrastructure, releases, integrations, or customer-facing systems.

## 1. Severity

| Severity | Definition |
|---|---|
| SEV-1 Critical | Active compromise, critical RCE, credential compromise, or major data exposure |
| SEV-2 High | Significant security control failure or exploitable vulnerability |
| SEV-3 Medium | Limited security impact |
| SEV-4 Low | Minor security weakness |

These are internal targets, not contractual SLAs.

## 2. Lifecycle

`DETECT` → `TRIAGE` → `CONTAIN` → `ERADICATE` → `RECOVER` → `VALIDATE` → `DISCLOSE`

## 3. Detection Sources

- runtime security alerts
- audit anomalies
- CI failures
- CodeQL findings
- dependency advisories
- user reports
- security researchers
- monitoring
- supply-chain alerts

## 4. Evidence

Every material incident should record incident identifier, timeline, affected versions/components, detection source, severity, containment, remediation, validation evidence, disclosure decision, and lessons learned.

## 5. Post-Incident Review

The review must determine what happened, why controls failed, how detection occurred, what evidence exists, what changed, what regression tests were added, and which controls need strengthening.

## 6. Principles

- preserve evidence
- never publish credentials
- do not erase relevant logs
- prefer containment over speculation
- independently validate remediation
- add regression coverage for material defects
