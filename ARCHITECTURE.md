# Aegisora Architecture & System Design

Aegisora is an enterprise B2B AI security proxy designed to eliminate the **"Binary Trap"** in AI decision-making.

## 🏛 Core Design Principles

1. **Deterministic Fast-Path (<10ms):** Ordinary, low-risk requests pass through a lightweight, synchronous check.
2. **The Third State (Escalate):** Instead of making final binary decisions on ambiguous or high-risk requests, the system escalates them for human review.
3. **Execution Integrity:** Cryptographic proofs are utilized for workload provenance and auditability.

## 🔄 Request Lifecycle

```
[ AI Agent / Request ]
        |
        ▼
┌───────────────────────────────────────────┐
│ Synchronous Fast-Path (<10ms) │──(Normal)──▶ [ ALLOW ]
└───────────────────────────────────────────┘
        |
        |──(High Risk / Ambiguous)
        ▼
┌───────────────────────────────────────────┐
│ Human Review Queue │──(Admin Action)──▶ [ APPROVE / REJECT ]
└───────────────────────────────────────────┘
```

## 🛠 Technology Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Backend & State:** Python & Supabase
- **Deployment:** Vercel Edge Network
