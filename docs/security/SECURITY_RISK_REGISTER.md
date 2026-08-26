# Aegisora Security Risk Register

## Purpose

This register tracks material security risks affecting the Aegisora
runtime, software supply chain, repository, release process, and
supporting operational controls.

This register is an engineering risk-management artifact. It is not
a certification or independent assurance report.

---

## Risk Status

| Status | Meaning |
|---|---|
| OPEN | Risk is identified and requires treatment |
| MITIGATING | Controls are being strengthened |
| ACCEPTED | Explicit risk acceptance exists |
| CLOSED | Risk treatment is complete and validated |
| MONITORED | Risk remains but is actively monitored |

---

## Risk Rating

Risk rating uses:

`Likelihood × Impact`

| Rating | Meaning |
|---|---|
| Critical | Potential for severe unauthorized execution, major data exposure, credential compromise, or supply-chain compromise |
| High | Material security boundary or operational failure |
| Medium | Meaningful but constrained security impact |
| Low | Limited security impact |

---

## Active Risk Register

| ID | Risk | Likelihood | Impact | Rating | Owner | Status | Treatment / Evidence |
|---|---|---:|---:|---|---|---|---|
| RISK-001 | Runtime enforcement bypass | 2 | 5 | High | Engineering | MITIGATING | Enforcement boundary + negative-path tests |
| RISK-002 | Tool authorization bypass | 2 | 5 | High | Engineering | MITIGATING | Tool identity + policy enforcement |
| RISK-003 | Provider execution bypass | 2 | 5 | High | Engineering | MITIGATING | Provider execution gateway + regression tests |
| RISK-004 | Malicious plugin/integration | 3 | 4 | High | Engineering | MITIGATING | Plugin boundary + package review |
| RISK-005 | Dependency compromise | 3 | 4 | High | Engineering | MITIGATING | Lockfile + CI + package validation |
| RISK-006 | Release credential compromise | 2 | 5 | High | Release Owner | MITIGATING | npm OIDC trusted publishing |
| RISK-007 | Repository unauthorized change | 2 | 5 | High | Repository Owner | MITIGATING | CODEOWNERS + branch protection |
| RISK-008 | Security evidence unavailable | 3 | 3 | Medium | Security Owner | MITIGATING | Evidence register + CI records |
| RISK-009 | Incident response inconsistency | 2 | 4 | Medium | Security Owner | MITIGATING | Incident response procedure |
| RISK-010 | Vulnerability remediation delay | 3 | 4 | High | Security Owner | MITIGATING | Vulnerability lifecycle + release blocking |

---

## Treatment Rules

### Critical

Critical risks block release unless a documented and explicitly approved
exception exists.

### High

High risks require documented treatment or explicit risk acceptance
before release.

### Medium

Medium risks require an owner, treatment plan, and review cadence.

### Low

Low risks may be monitored and incorporated into planned hardening.

---

## Required Risk Metadata

Every active risk should have:

- unique identifier
- description
- likelihood
- impact
- rating
- owner
- status
- treatment
- evidence
- review date
- exception or acceptance if applicable

---

## Review Cadence

Risk review should occur:

- quarterly
- before major releases
- after material architecture changes
- after security incidents
- after material vulnerabilities
- before external assurance activities

---

## Closure Rule

A risk is not closed solely because code changed.

Closure requires:

1. remediation
2. validation
3. evidence
4. owner confirmation
