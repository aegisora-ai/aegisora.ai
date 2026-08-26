# Aegisora Access Review Procedure

## Purpose

This procedure defines the recurring review of access to repositories,
release systems, CI/CD environments, npm publishing, secrets, and other
security-sensitive resources.

This document defines the process and evidence model.

---

## Review Scope

The review should cover:

- GitHub organization membership
- repository collaborators
- repository administration access
- branch and ruleset administration
- GitHub Actions configuration
- environment protection
- npm trusted publishing configuration
- npm organization/package permissions
- cloud credentials
- CI secrets
- security-sensitive integrations
- external service accounts

---

## Review Frequency

Minimum cadence:

**Quarterly**

Additional review is required:

- after personnel changes
- after role changes
- after security incidents
- after credential compromise
- before major external assurance activities

---

## Review Procedure

### 1. Inventory

Export or inspect current identities and permissions.

### 2. Verify Business Need

Confirm that each privileged permission is required.

### 3. Remove Excess Access

Revoke unnecessary access.

### 4. Validate Separation of Duties

Release-critical permissions should not be broader than necessary.

### 5. Record Evidence

Record reviewer, date, scope, result, exceptions, and remediation.

### 6. Close Review

The security owner confirms completion.

---

## Evidence Record

Each access review should record:

| Field | Required |
|---|---|
| Review ID | Yes |
| Review date | Yes |
| Reviewer | Yes |
| Scope | Yes |
| Systems reviewed | Yes |
| Result | Yes |
| Exceptions | Yes |
| Remediation | If applicable |
| Evidence location | Yes |
| Next review date | Yes |

---

## Review Result Vocabulary

| Result | Meaning |
|---|---|
| PASS | Access is appropriate |
| PASS WITH EXCEPTION | Access remains temporarily with documented justification |
| FAIL | Unauthorized or excessive access exists |

---

## Evidence Retention

Access review evidence should be retained according to the organization's
security and compliance retention requirements.

---

## Ownership

Repository and infrastructure access should have a designated owner.

Security review should have a designated security owner.

Release publishing access should have a designated release owner.
