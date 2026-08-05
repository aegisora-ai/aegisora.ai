# Aegisora Architecture & System Design

Aegisora is an enterprise B2B AI security proxy engineered to eliminate the **"Binary Trap"** in autonomous AI agent execution. Traditional security tooling forces a rigid allow/block choice; Aegisora introduces a zero-trust, low-latency runtime governance layer.

---

## 🏛 Core Design Principles

1. **Deterministic Fast-Path (<10ms):** Routine, low-risk tool calls and agent actions are evaluated via a lightweight, synchronous check to ensure zero productivity loss.
2. **The Third State (Asynchronous Escalation):** Rather than breaking workflows on ambiguous or high-risk requests, Aegisora routes them to a secure **Human Review Queue**.
3. **Prompt Injection & PII Firewall:** Every incoming payload undergoes real-time regex/heuristic and LLM-assisted scanning to neutralize prompt injections and redact sensitive data (PII) before execution.
4. **Execution Integrity:** Cryptographic provenance and immutable audit trails ensure full compliance for enterprise workloads.

---

## 🔄 Request Lifecycle & Data Flow

```text
[ Autonomous AI Agent / Tool Call ]
                 │
                 ▼
     ┌───────────────────────┐
     │  Aegisora Entry Proxy │
     └───────────────────────┘
                 │
                 ├── (Prompt Injection & PII Scan)
                 │
                 ▼
┌───────────────────────────────────────────────────┐
│        Synchronous Fast-Path Evaluation           │
│                   (<10ms)                         │
└───────────────────────────────────────────────────┘
                 │
                 ├── [ Low Risk / Policy OK ] ────▶ [ ALLOW & EXECUTE ]
                 │
                 └── [ High Risk / Ambiguous ] ───▶ [ ESCALATE ]
                                                           │
                                                           ▼
                                            ┌─────────────────────────────┐
                                            │    Human Review Queue       │
                                            │  (Asynchronous Approval)    │
                                            └─────────────────────────────┘
                                                           │
                                              ┌────────────┴────────────┐
                                              ▼                         ▼
                                        [ APPROVAL ]              [ REJECTION ]
                                              │                         │
                                              ▼                         ▼
                                      [ EXECUTE ACTION ]        [ LOG & BLOCK ]
```

## 🛡️ Security & Governance Layers

- **Inspection Layer:** Intercepts raw tool arguments, system prompts, and structured outputs.
- **Enforcement Engine:** Evaluates requests against custom organization policies stored securely in Supabase.
- **Audit & Telemetry:** Logs every decision path (allow, block, escalate) with complete reasoning traces for compliance (SOC2/ISO ready).

## 🛠 Technology Stack

| Layer           | Technology                       | Purpose                                                          |
| --------------- | -------------------------------- | ---------------------------------------------------------------- |
| Framework       | Next.js (App Router, TypeScript) | Core application UI, dashboard, and management plane             |
| Styling         | Tailwind CSS                     | Modern, enterprise-grade interface                               |
| Backend & State | Python & Supabase                | Real-time event logging, policy storage, and relational database |
| Edge Network    | Vercel Edge Network              | Low-latency global proxy routing and execution                   |

## 📄 License

Distributed under the MIT License. See LICENSE for more information.
