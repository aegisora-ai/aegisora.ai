# Aegisora Security Evidence Register

## Purpose

Framework for tracking evidence demonstrating that security controls operate
as designed.

This register defines the evidence model; it is not itself evidence.

---

## Evidence Levels

| Level | Meaning |
|---|---|
| L0 | Undefined |
| L1 | Documented |
| L2 | Implemented |
| L3 | Measured |
| L4 | Independently Assured |

The engineering target is L3 for critical technical controls.

---

## R4 Machine-Readable Evidence

Security Readiness CI generates:

```text
security-evidence/
├── manifest.json
├── summary.json
├── controls.json
├── packages.json
├── tests.json
├── risks.json
└── git.json
```

Each CI run produces a machine-readable evidence package with:

- workflow identity
- commit identity
- build result
- typecheck result
- test result
- tarball audit result
- secret scan result
- CODEOWNERS result
- package metadata
- tracked security risks
- measured control mappings

---

## Evidence Retention

CI evidence artifacts are retained according to the workflow retention
policy. The current Security Readiness workflow retains generated evidence
for 90 days.

---

## L3 Rule

A critical technical control may be considered L3 only when a durable
machine-readable evidence source records the control outcome.

R4 implements the initial automated L3 evidence pipeline.