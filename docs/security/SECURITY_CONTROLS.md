# Aegisora Security Controls

## Purpose

Engineering control register for Aegisora security readiness. This is not a certification statement.

## Status Vocabulary

| Status | Meaning |
|---|---|
| Implemented | Control exists and is demonstrable |
| Partially Implemented | Material control exists but needs strengthening |
| Planned | Required future maturity |
| Evidence Required | Control or process needs formal evidence |

## Control Register

| ID | Control | Status | Evidence |
|---|---|---|---|
| SEC-001 | Central runtime interception | Implemented | Runtime architecture + tests |
| SEC-002 | Enforcement boundary before execution | Implemented | Execution path + regression tests |
| SEC-003 | ALLOW/BLOCK/ESCALATE decisions | Implemented | Decision engine |
| SEC-004 | Policy evaluation before execution | Implemented | Policy engine |
| SEC-005 | Tool authorization | Implemented | Tool execution controls |
| SEC-006 | Security decision auditability | Implemented | Audit subsystem |
| SEC-007 | Runtime observability | Implemented | Observability subsystem |
| SEC-008 | Negative-path enforcement tests | Implemented | Runtime security tests |
| SEC-009 | Public package version validation | Implemented | Release workflow |
| SEC-010 | Package metadata validation | Implemented | Release workflow |
| SEC-011 | Tarball workspace leak detection | Implemented | Release audit |
| SEC-012 | OIDC npm publishing | Implemented | GitHub Actions |
| SEC-013 | Trusted npm publishing | Implemented | npm publisher configuration |
| SEC-014 | Protected release tagging | Partially Implemented | Release procedure + CI |
| SEC-015 | Dependency lockfile integrity | Implemented | Frozen-lockfile CI |
| SEC-016 | Static analysis | Implemented | CodeQL |
| SEC-017 | Continuous integration | Implemented | CI workflows |
| SEC-018 | Vulnerability reporting process | Implemented | SECURITY.md |
| SEC-019 | Formal threat model | Implemented | THREAT_MODEL.md |
| SEC-020 | Formal control register | Implemented | SECURITY_CONTROLS.md |
| SEC-021 | Incident response procedure | Implemented | INCIDENT_RESPONSE.md |
| SEC-022 | Vulnerability management lifecycle | Implemented | VULNERABILITY_MANAGEMENT.md |
| SEC-023 | Evidence register | Implemented | EVIDENCE_REGISTER.md |
| SEC-024 | Formal security risk register | Implemented | SECURITY_RISK_REGISTER.md |
| SEC-025 | Formal access reviews | Implemented | ACCESS_REVIEW.md |
| SEC-026 | Formal security training | Planned | Organizational control |
| SEC-027 | Independent penetration testing | Planned | External assurance |
| SEC-028 | SOC 2 examination | Planned | External assurance |
| SEC-029 | ISO/IEC 27001 certification | Planned | External assurance |
| SEC-030 | Business continuity testing | Planned | Operational maturity |

## Evidence Principles

Evidence should demonstrate owner, scope, implementation, execution frequency, result, exceptions, remediation, and retention.

## Review Frequency

Controls should be reviewed at least quarterly, after material architecture changes, after significant incidents, and before major external assurance activities.
