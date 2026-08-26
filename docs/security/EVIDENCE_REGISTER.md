# Aegisora Security Evidence Register

## Purpose

Framework for tracking evidence demonstrating that security controls operate as designed.

This register defines the evidence model; it is not itself evidence.

## Evidence Classes

| ID | Evidence class | Example |
|---|---|---|
| E-001 | Architecture | Security boundary diagrams |
| E-002 | Code | Enforcement gate implementation |
| E-003 | Test | Security regression tests |
| E-004 | CI | Build/typecheck/test results |
| E-005 | SAST | CodeQL results |
| E-006 | Dependency | Lockfile and dependency review |
| E-007 | Release | Release validation workflow |
| E-008 | Package | npm metadata and tarball audits |
| E-009 | Audit | Runtime decision/event records |
| E-010 | Incident | Incident timeline and remediation |
| E-011 | Vulnerability | Vulnerability lifecycle evidence |
| E-012 | Access | Repository/environment access reviews |
| E-013 | Operations | Backup and recovery tests |
| E-014 | Training | Security training records |
| E-015 | External Assurance | Penetration test / audit reports |

## Evidence Metadata

Each evidence item should contain:

```text
evidence_id
control_id
owner
source
created_at
reviewed_at
environment
result
retention
```

## Current Evidence Sources

Repository-level evidence includes Git history, CI workflows, CodeQL runs, release workflows, package validation, runtime security tests, package tarball audits, SECURITY.md, architecture documentation, and governance documentation.

## Evidence To Formalize

- control-owner assignments
- recurring access reviews
- formal risk register
- formal security review cadence
- backup/recovery evidence
- penetration testing
- independent assurance
- security training
- vendor/subprocessor inventory

## Rule

A control should become externally auditable only after a durable evidence source has been identified.
