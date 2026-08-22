# Aegisora Architecture & System Design

Aegisora is an open-source runtime security and governance layer for autonomous AI agents.

It is designed to sit between an AI agent and the systems it is allowed to interact with, evaluating actions before execution and producing one of three outcomes:

**ALLOW**, **BLOCK**, or **ESCALATE**.

The architecture is built around a zero-trust principle:

> **Agent autonomy should not imply unrestricted authority.**

---

## 🏛 Core Design Principles

### 1. Policy Before Execution

Agent actions are evaluated before they reach the target system.

The enforcement layer can inspect the requested operation, relevant context, configured policies, and risk signals before allowing execution.

### 2. Three-State Enforcement

Aegisora does not rely exclusively on a binary allow/block model.

Actions can result in:

* **ALLOW** — the request satisfies the applicable policies and may continue.
* **BLOCK** — the request violates a policy or matches a known unsafe condition.
* **ESCALATE** — the action requires additional human judgment before execution.

### 3. Defense in Depth

Security decisions can combine multiple layers of inspection and policy evaluation.

Depending on the configured workflow, these may include:

* Tool and action inspection
* Agent identity and permissions
* Resource and data sensitivity
* Session context
* Policy rules
* Prompt-injection and adversarial signals
* Audit and telemetry data

### 4. Human-in-the-Loop for Ambiguous Actions

High-risk or ambiguous actions should not automatically force the system into either unrestricted execution or unnecessary blocking.

Aegisora can route these actions into a **Human Review Queue**, where an authorized reviewer can approve or deny the action.

### 5. Observable by Design

Security decisions should be inspectable.

Aegisora records enforcement activity so operators and developers can understand:

* What action was requested
* Which policy was evaluated
* What signals were considered
* What decision was produced
* Why an escalation occurred
* When the decision was made

---

## 🔄 Request Lifecycle & Data Flow

A typical governed action follows this conceptual lifecycle:

```text
[ Autonomous AI Agent ]
          │
          │  Tool / API / Action Request
          ▼
┌──────────────────────────────┐
│      Aegisora Runtime        │
│          Gateway             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   Inspection & Context       │
│                              │
│ • Agent identity             │
│ • Tool / action              │
│ • Resource scope             │
│ • Data sensitivity           │
│ • Session context            │
│ • Security signals           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Policy Evaluation       │
└──────────────┬───────────────┘
               │
        ┌──────┼──────┐
        ▼      ▼      ▼
      ALLOW   BLOCK  ESCALATE
        │      │       │
        │      │       ▼
        │      │  Human Review
        │      │       │
        │      │   ┌───┴───┐
        │      │   ▼       ▼
        │      │ APPROVE   DENY
        │      │   │        │
        ▼      ▼   ▼        ▼
      EXECUTE  REJECT      REJECT
```

The exact implementation path can vary by integration, but the enforcement model remains centered on evaluating an action before execution.

---

## 🛡️ Security & Governance Layers

### Inspection Layer

The inspection layer processes incoming agent activity and relevant action context.

Depending on the integration, this may include:

* Tool calls
* API requests
* Structured arguments
* Resource identifiers
* Agent metadata
* Relevant session context

### Enforcement Layer

The enforcement layer evaluates the request against configured security and governance policies.

Policy decisions can incorporate:

* Agent permissions
* Tool permissions
* Resource scope
* Data sensitivity
* Rate limits
* Session context
* Detection signals

### Human Review Layer

Actions that cannot be safely resolved through automatic policy evaluation can be escalated for human review.

The review context should make it possible for an authorized reviewer to understand the requested action without reconstructing the entire event from raw logs.

### Audit & Telemetry Layer

Runtime decisions should be recorded for observability and investigation.

Typical audit information can include:

* Requested action
* Agent identity
* Policy evaluation
* Risk signals
* Final decision
* Escalation context
* Timestamp

---

## 🧠 Risk Evaluation Model

Aegisora's conceptual decision process can be represented as:

```text
Agent Action
     │
     ▼
Policy Evaluation
     │
     ▼
Risk & Context Signals
     │
     ▼
Decision
 ┌───┼────────┐
 ▼   ▼        ▼
ALLOW BLOCK ESCALATE
```

### Deterministic Rules

Clear policy matches can produce an immediate decision.

Examples include:

* Explicit allow rules
* Explicit deny rules
* Agent permissions
* Tool restrictions
* Resource scope restrictions
* Rate limits

### Contextual Signals

When a request cannot be resolved by a deterministic rule alone, additional context may be considered.

Examples include:

* Requested resource
* Data sensitivity
* Agent identity
* Previous actions
* Workflow context
* Adversarial or injection-related signals

### Escalation

When the resulting risk cannot be resolved with sufficient confidence, the action may be sent to human review rather than automatically executed.

---

## 🧩 Extensibility

Aegisora is designed as a security and governance layer rather than an agent framework.

The architecture is intended to support extensions such as:

* Security policies
* Detection rules
* Agent integrations
* Framework integrations
* Security test cases
* Benchmark scenarios
* Developer tooling

This allows the enforcement layer to evolve independently from the agent implementation.

---

## 🛠 Technology Stack

The current repository is primarily built around the following technologies:

| Layer                | Technology                | Role                                               |
| -------------------- | ------------------------- | -------------------------------------------------- |
| Application          | Next.js                   | Web application, dashboard, and application routes |
| Language             | TypeScript                | Primary application language                       |
| UI                   | React                     | Interface and interactive components               |
| Styling              | Tailwind CSS              | Application styling                                |
| Data & Auth          | Supabase                  | Database, authentication, and application state    |
| Runtime / APIs       | Next.js API Routes        | Server-side application endpoints                  |
| Validation & Tooling | TypeScript, Vitest, Turbo | Type checking, testing, and project tooling        |
| Deployment           | Vercel                    | Application deployment                             |

The repository also contains dedicated CI and security automation under `.github/workflows`, including CI and CodeQL workflows.

---

## 🔐 Security Boundaries

Aegisora should be treated as an enforcement boundary between autonomous software and the systems it can affect.

The main security boundary is:

```text
┌───────────────────────────────┐
│        AI AGENT / APP         │
└───────────────┬───────────────┘
                │
                ▼
       ┌──────────────────┐
       │     AEGISORA     │
       │ Policy + Runtime │
       │    Governance    │
       └────────┬─────────┘
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
     Allowed  Blocked  Reviewed
        │                │
        └───────┬────────┘
                ▼
       Target System / Tool
```

The goal is to ensure that an agent cannot translate a generated instruction into an unrestricted external action without passing through the configured governance layer.

---

## 📊 Performance & Benchmarking

Aegisora is designed with low-overhead runtime enforcement in mind.

Performance characteristics should be established through reproducible benchmarks rather than undocumented fixed guarantees.

Relevant measurements include:

* Policy evaluation latency
* Request throughput
* Escalation latency
* False-block rate
* False-allow rate
* Classification precision and recall
* Resource overhead

Benchmark results should be published with their methodology, workload, environment, and configuration so they can be independently reproduced.

---

## 🚧 Current Architecture Status

The architecture described here represents the current design direction of the project.

Some capabilities may continue to evolve as the runtime, policy engine, integrations, and security benchmarks mature.

When implementation details change, this document should be updated alongside the corresponding code.

For contribution and development guidance, see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

For security reporting and the current threat model, see [`SECURITY.md`](./SECURITY.md).

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
