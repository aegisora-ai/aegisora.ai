# Aegisora Compliance Readiness

## Important Notice

This document describes readiness and control mapping only.

Aegisora does not claim SOC 2 compliance, SOC 2 attestation, ISO/IEC 27001 certification, or any other independent certification unless and until the applicable external examination or certification has actually been completed.

## 1. Target Frameworks

- SOC 2 Trust Services Criteria
- ISO/IEC 27001:2022
- customer security questionnaires
- software supply-chain assurance requirements

## 2. Readiness Mapping

| Domain | Current baseline | Readiness |
|---|---|---|
| Security governance | Governance + control register | Partial |
| Risk management | Threat model + control register | Partial |
| Access control | Runtime authorization + repository controls | Partial |
| Change management | Git + CI + release process | Strong |
| Secure development | CI + tests + CodeQL | Strong |
| Vulnerability management | Vulnerability lifecycle | Partial |
| Incident response | Incident response procedure | Partial |
| Logging / monitoring | Audit + observability | Strong |
| Release integrity | Tags + OIDC publishing | Strong |
| Dependency management | Frozen lockfile + package validation | Strong |
| Supplier risk | Dependency/integration review | Partial |
| Business continuity | Release reproducibility | Partial |
| Privacy governance | Security/privacy principles | Partial |
| Independent assurance | Not yet performed | Planned |

## 3. SOC 2 Readiness

Current strengths include centralized enforcement, authorization, policy controls, auditability, CI, CodeQL, and vulnerability reporting.

Remaining maturity work includes formal access reviews, a formal risk register, control owners, recurring evidence collection, and independent control testing.

## 4. ISO/IEC 27001 Readiness

Expected maturity path:

1. Define organizational scope.
2. Define security objectives.
3. Create asset inventory.
4. Create risk register.
5. Determine risk treatment.
6. Define applicable controls.
7. Assign owners.
8. Collect evidence.
9. Operate controls continuously.
10. Conduct internal audit.
11. Perform management review.
12. Undergo external certification audit.

## 5. Evidence Model

Evidence should include evidence ID, control ID, owner, date, source, environment, result, and retention period.

Examples include CI runs, release logs, package validation, CodeQL results, vulnerability records, security regression tests, access reviews, incident records, and architecture decisions.

## 6. Maturity Scale

| Level | Meaning |
|---|---|
| 0 | Undefined |
| 1 | Documented |
| 2 | Implemented |
| 3 | Measured |
| 4 | Independently assured |

Target: **move critical technical controls to Level 3 before external assurance.**

## 7. Certification Boundary

Future certification scope must be defined separately from the open-source repository. The repository alone is not equivalent to an enterprise organizational certification boundary.
