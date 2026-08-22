# Aegisora

<div align="center">

  <a href="https://github.com/aegisora-ai/aegisora.ai">
    <img src="assets/aegisora-logo.png" alt="Aegisora Logo" width="120" height="120">
  </a>

  <p>
    <strong>Open-source runtime security for AI agents.</strong>
  </p>

  <p>
    Intercept every agent action before execution and decide:
    <strong>ALLOW</strong>, <strong>BLOCK</strong>, or <strong>ESCALATE</strong>.
  </p>

  <p>
    <a href="https://aegisora-ai.vercel.app"><strong>Live Demo</strong></a>
    &nbsp;·&nbsp;
    <a href="#-how-risk-classification-works"><strong>How It Works</strong></a>
    &nbsp;·&nbsp;
    <a href="./ARCHITECTURE.md"><strong>Architecture</strong></a>
    &nbsp;·&nbsp;
    <a href="./SECURITY.md"><strong>Security</strong></a>
    &nbsp;·&nbsp;
    <a href="https://discord.gg/8CM3PpQRT5"><strong>Discord</strong></a>
  </p>

  <p>
    <a href="https://www.producthunt.com/posts/aegisora" target="_blank">
      <img src="https://img.shields.io/badge/Product%20Hunt-Featured%20on%20PH-FF6154?style=for-the-badge&logo=producthunt&logoColor=white" alt="Product Hunt Featured">
    </a>
  </p>

  <p>
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License">
    </a>
    <a href="https://github.com/aegisora-ai/aegisora.ai/releases">
      <img src="https://img.shields.io/github/v/release/aegisora-ai/aegisora.ai?color=green&label=release" alt="Release">
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-14%2B-black" alt="Next.js">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript">
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/TailwindCSS-38B2AC" alt="Tailwind CSS">
    </a>
    <a href="https://discord.gg/8CM3PpQRT5">
      <img src="https://img.shields.io/badge/Discord-Join%20us-5865F2?logo=discord&logoColor=white" alt="Discord">
    </a>
  </p>

</div>

> **Aegisora sits between your AI agent and the systems it can act on.**
> Every tool call is evaluated at runtime before execution.

```text
                    AI AGENT
                       │
                       ▼
              ┌─────────────────┐
              │    AEGISORA     │
              │ Runtime Control │
              └────────┬────────┘
                       │
             ┌─────────┼─────────┐
             ▼         ▼         ▼
           ALLOW     BLOCK    ESCALATE
                                  │
                                  ▼
                           Human Review
```

### Why Aegisora?

AI agents can call tools, APIs, databases, and production systems autonomously.

Aegisora adds a zero-trust enforcement layer between the agent and those systems:

* **Allow** safe, policy-compliant actions instantly.
* **Block** clear violations and known attack patterns.
* **Escalate** ambiguous or high-risk actions to human review.
* **Audit** every decision and its reasoning.

**Open source. Inspectable. Extensible. Built for developers.**

<p align="center">
  <a href="https://aegisora-ai.vercel.app">
    <strong>▶ Try the live demo</strong>
  </a>
  &nbsp;·&nbsp;
  <a href="https://github.com/aegisora-ai/aegisora.ai">
    <strong>★ Explore the source</strong>
  </a>
  &nbsp;·&nbsp;
  <a href="https://discord.gg/8CM3PpQRT5">
    <strong>Join the community</strong>
  </a>
</p>

---

## Table of Contents

- [Overview](#-overview)
- [Why Aegisora — Enterprise Value](#-why-aegisora--enterprise-value)
- [The Problem We Solve](#-the-problem-we-solve)
- [How Risk Classification Works](#-how-risk-classification-works)
- [The Human Review Queue — Efficiency by Design](#-the-human-review-queue--efficiency-by-design)
- [Metrics & Benchmarks](#-metrics--benchmarks)
- [Core Capabilities](#️-core-capabilities)
- [Tech Stack](#-tech-stack)
- [Quickstart](#-quickstart)
- [Contributing](#-contributing)
- [License](#-license)
- [Contributors](#-contributors)

---

## 🎯 Overview

As enterprises grant autonomous AI agents direct access to critical databases, internal tools, and production infrastructure, the attack surface for prompt injection, data exfiltration, and unauthorized action execution grows exponentially — and traditional security tooling was never designed to govern non-deterministic, self-directed software.

**Aegisora** is an open-source, zero-trust runtime governance layer built specifically for autonomous AI agents. It sits between your AI agents and the systems they act upon as a real-time enforcement layer — every tool call, every action, and every output is intercepted, evaluated against policy, and logged **before** it ever touches production.

Instead of relying on traditional allow/block firewalls that break non-deterministic agent workflows, Aegisora uses **Asynchronous Human Escalation** to pause, quarantine, and verify only the requests that genuinely need a human judgment call — not every request.

---

## 🔥 Why Aegisora?

AI agents don't just generate text.

They call APIs.
They query databases.
They execute tools.
They access files and production systems.

That creates a problem:

**Who decides whether an agent is actually allowed to perform an action?**

Aegisora sits directly in the runtime path and makes that decision **before the action executes.**

### The Aegisora Difference

| Approach                  | Runtime Enforcement | Human Review | Audit Trail |
| ------------------------- | :-----------------: | :----------: | :---------: |
| Traditional guardrails    |          ⚠️         |       ❌      |      ⚠️     |
| API gateways              |          ✅          |       ❌      |      ✅      |
| Manual approval workflows |          ✅          |       ✅      |      ⚠️     |
| **Aegisora**              |        **✅**        |     **✅**    |    **✅**    |

### One Runtime Decision

Every intercepted action enters the same decision model:

**✅ ALLOW** — safe and policy-compliant actions continue immediately.

**⛔ BLOCK** — clear violations and known attack patterns are stopped.

**⏸️ ESCALATE** — ambiguous or high-risk actions are sent to human review.

This avoids the traditional **"allow everything or block everything"** problem.

### Built for Developers

Aegisora is open source because agent security should be:

* **Inspectable** — understand exactly what happens at runtime.
* **Extensible** — build your own policies, detectors and integrations.
* **Testable** — reproduce and verify security decisions.
* **Community-driven** — contribute rules, integrations, benchmarks and code.

> **The goal isn't to stop AI agents.**
> **The goal is to let them act safely.**


---

## 🎯 The Problem We Solve

AI agents are becoming software that can **act**, not just generate.

They can:

* Call internal and external APIs
* Query databases
* Execute tools
* Read and write files
* Trigger workflows
* Perform actions in production systems

That means a prompt-injection attack, a compromised tool, or an overly-permissive agent policy can become a **real system action**.

### The Binary Trap

Most security systems eventually reduce an action to:

**ALLOW** or **BLOCK**

That works for simple, deterministic requests.

But autonomous agents constantly encounter situations that are:

* Too risky to allow automatically
* Too legitimate to block outright
* Too ambiguous for a deterministic rule

Blocking everything destroys agent productivity.

Allowing everything creates unacceptable risk.

### Aegisora adds a third state

Instead of forcing every action into a binary decision, Aegisora introduces:

| Decision        | What happens                                                          |
| --------------- | --------------------------------------------------------------------- |
| ✅ **ALLOW**     | Safe, policy-compliant actions continue immediately.                  |
| ⛔ **BLOCK**     | Clear violations and known attack patterns are stopped.               |
| ⏸️ **ESCALATE** | Ambiguous or high-risk actions are paused and routed to human review. |

This creates a simple runtime rule:

> **Don't trust the agent. Don't block the agent. Govern the action.**

Every decision is evaluated **before execution** and recorded in the audit trail.

---

### Example

An AI agent wants to:

```text
DELETE production_database
```

Aegisora evaluates the request.

```text
┌─────────────────────────────┐
│       AI AGENT ACTION       │
│  DELETE production_database │
└──────────────┬──────────────┘
               │
               ▼
        ┌───────────────┐
        │   AEGISORA    │
        │ Policy Engine │
        └───────┬───────┘
                │
                ▼
          ⏸️ ESCALATE
                │
                ▼
          Human Review
```

The agent doesn't get unrestricted access.

The action doesn't have to be blindly blocked either.

**Aegisora governs the decision at runtime.**


---
## 🧠 How Risk Classification Works

Every action that passes through Aegisora is evaluated **before execution**.

The goal is simple:

> **Make the safest decision possible without unnecessarily stopping the agent.**

### Runtime Decision Flow

```text
Agent Action
     │
     ▼
┌─────────────────────┐
│  Policy Evaluation  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Risk Signals      │
│                     │
│ • Permissions       │
│ • Data sensitivity  │
│ • Agent identity    │
│ • Session context   │
│ • Attack patterns   │
│ • Policy violations │
└──────────┬──────────┘
           │
           ▼
     Decision Engine
           │
    ┌──────┼───────┐
    ▼      ▼       ▼
  ALLOW  BLOCK  ESCALATE
```

### 1. Policy Match

Aegisora first checks deterministic policy rules such as:

* Allow-lists and deny-lists
* Agent permissions
* Tool permissions
* Data-class restrictions
* Rate limits
* Resource scope

Clear matches can immediately produce an **ALLOW** or **BLOCK** decision.

### 2. Risk Signals

Actions that cannot be resolved by deterministic rules are evaluated using contextual signals.

These can include:

* What resource the agent is accessing
* What data is involved
* The agent's declared identity
* Previous actions in the session
* Deviation from the expected workflow
* Known adversarial or injection patterns

### 3. Confidence & Decision

The collected signals are evaluated against policy thresholds.

```text
Low Risk
   │
   └──► ✅ ALLOW

Clear Violation
   │
   └──► ⛔ BLOCK

Ambiguous / High Risk
   │
   └──► ⏸️ ESCALATE
```

### 4. Full Audit Trail

Every decision is recorded.

The audit trail can include:

* The original action
* The agent identity
* Policies evaluated
* Risk signals
* Final decision
* Escalation context
* Timestamp

This makes every enforcement decision **observable, explainable and auditable**.

### Why this matters

Aegisora is designed around a simple principle:

> **Agents should be autonomous in execution, but never unrestricted in authority.**

---

## 🧑‍⚖️ Human Review Queue

Not every dangerous action should be automatically blocked.

Not every ambiguous action should be automatically allowed.

Aegisora introduces a third runtime outcome:

> **ESCALATE**

When the policy engine cannot confidently allow or block an action, Aegisora can pause the action and send it to a **Human Review Queue**.

### How it works

```text
AI Agent
   │
   ▼
Aegisora
   │
   ├── ✅ ALLOW ───────► Execute
   │
   ├── ⛔ BLOCK ───────► Reject
   │
   └── ⏸️ ESCALATE
           │
           ▼
      Human Review
           │
      ┌────┴────┐
      ▼         ▼
   APPROVE     DENY
      │         │
      ▼         ▼
   Execute     Reject
```

### Why escalation exists

Consider an agent attempting to perform:

```text id="74p4j6"
transfer_funds(
  destination = "new_bank_account",
  amount = "$25,000"
)
```

This might be legitimate.

It might also be dangerous.

A simple binary security layer has two choices:

**Allow it** — and accept the risk.

**Block it** — and potentially break a legitimate workflow.

Aegisora can instead:

**ESCALATE → Human Review → Approve or Deny**

### Review context

The reviewer should not have to reconstruct what happened from raw logs.

Aegisora is designed to provide the context surrounding the decision, including:

* Agent identity
* Requested action
* Target resource
* Relevant policy rules
* Risk signals
* Previous session context
* Reason for escalation
* Audit history

This makes human review a **decision point**, not a manual investigation.

### The goal

The Human Review Queue is not meant to replace automation.

It exists to make **safe automation possible at higher levels of autonomy.**

> **Automate the obvious. Block the dangerous. Escalate the ambiguous.**


---

## 📊 Metrics & Benchmarks

Security claims should be backed by evidence.

Aegisora is intentionally transparent about what has been measured, what is still being benchmarked, and where the community can help.

### Current Benchmark Status

| Metric                            | What it measures                                | Status         |
| --------------------------------- | ----------------------------------------------- | -------------- |
| Classification precision / recall | Accuracy of Allow / Block / Escalate decisions  | 🚧 In progress |
| Escalation rate                   | How often actions require human review          | 🚧 In progress |
| Time to review                    | How quickly escalated decisions can be resolved | 🚧 In progress |
| False-block rate                  | Legitimate actions incorrectly blocked          | 🚧 In progress |
| False-allow rate                  | Risky actions incorrectly allowed               | 🚧 In progress |

### Why we're publishing this

We do **not** want to publish impressive-looking security numbers without reproducible evidence.

Instead, we are building benchmarks that can be:

* Reproduced
* Tested against real workloads
* Improved by contributors
* Compared across policy configurations
* Used to identify regressions

### Help us benchmark Aegisora

Open-source security tooling gets stronger when more people test it.

You can contribute by:

* Adding attack and abuse cases
* Creating evaluation datasets
* Testing new policy rules
* Reporting false positives
* Reporting false negatives
* Running Aegisora against real agent workflows
* Sharing anonymized benchmark results

> **Our goal is not to claim that Aegisora is secure.**
> **Our goal is to build a security system that can be continuously tested, challenged and improved in public.**

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) or join the [Discord community](https://discord.gg/8CM3PpQRT5).


---

## 🛡️ Core Capabilities

Aegisora is built as a runtime security layer for AI agents.

### 🔐 Runtime Action Security

Every agent action can pass through Aegisora before execution.

* Tool calls
* API requests
* Database operations
* File operations
* External service calls

Aegisora evaluates the action against policy before it reaches the target system.

### ⚖️ Three-State Enforcement

Every request can produce one of three outcomes:

**✅ ALLOW**
Safe, policy-compliant actions continue immediately.

**⛔ BLOCK**
Clear violations and known attack patterns are rejected.

**⏸️ ESCALATE**
Ambiguous or high-risk actions are routed to human review.

### 🧠 Policy & Risk Engine

Build policies around:

* Agent identity
* Tool permissions
* Resource scope
* Data sensitivity
* Rate limits
* Session context
* Known attack patterns

Policies are designed to be explicit, inspectable and extensible.

### 🛡️ Prompt Injection Protection

Aegisora can evaluate agent inputs and actions for patterns associated with prompt injection and adversarial behavior.

The goal is to prevent untrusted instructions from silently turning into privileged actions.

### 🔒 PII Protection

Sensitive information can be detected and protected across agent workflows.

Examples include:

* Email addresses
* Payment information
* National IDs / SSNs
* Other sensitive data classes

### 📡 Telemetry & Audit Trails

Security decisions should be observable.

Aegisora records enforcement activity so developers and security teams can inspect:

* What the agent attempted
* Which policy was evaluated
* What signals were detected
* What decision was made
* Why the decision occurred

### 🔏 Execution Integrity

Aegisora is designed to provide cryptographic provenance for execution records, helping make security and audit data tamper-evident.

### 🧩 Built for Extension

Open-source developers can extend Aegisora with:

* New policies
* Detection rules
* Integrations
* Agent frameworks
* Security tests
* Benchmarks
* Developer tooling

> **Aegisora is not another agent framework.**
> **It is the security and governance layer that sits around the agent.**

See [`SECURITY.md`](./SECURITY.md) for the threat model and security policy.


---

## 🧰 Tech Stack

| **Layer**           | **Technology**            |
| --------------------- | ---------------------------- |
| **Framework**        | Next.js (App Router)          |
| **Language**         | TypeScript                     |
| **Styling**          | Tailwind CSS                    |
| **Database & Auth**  | Supabase                         |
| **AI Integration**   | Groq API (default), pluggable LLM proxy interface |
| **Deployment**       | Vercel Edge Network                |

> Groq is the default inference provider used in the demo and reference deployment. The `AegisoraClient` SDK interface is provider-agnostic — see [`ARCHITECTURE.md`](./ARCHITECTURE.md) for how to configure alternative LLM providers.

---

## 🚀 Quickstart

Get Aegisora running in minutes.

There are two ways to start.

### Option A — Add Aegisora to an existing agent

Already have an AI agent?

Install the SDK:

```bash
npm install @aegisora/sdk
```

Then create a governed agent:

```typescript
import { AegisoraClient } from "@aegisora/sdk";

const client = new AegisoraClient();

const agent = client.agent({
  name: "my-governed-agent",
});

const result = await agent.run(
  "Summarize this harmless developer test."
);

console.log(result);
```

Your agent's actions can then be evaluated by Aegisora before execution.

```text
Agent
  │
  ▼
Aegisora
  │
  ├── ✅ ALLOW
  ├── ⛔ BLOCK
  └── ⏸️ ESCALATE
```

### Option B — Run the full open-source demo

Explore the runtime, policy engine, telemetry and Human Review Queue locally.

#### Requirements

* Node.js 18+
* pnpm, npm, or yarn
* Git

#### 1. Clone the repository

```bash
git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
```

#### 2. Install dependencies

```bash
pnpm install
```

#### 3. Configure environment variables

```bash
cp .env.example .env.local
```

At minimum, configure:

| Variable                    | Purpose                         |
| --------------------------- | ------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`  | Supabase project URL            |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase access     |
| `GROQ_API_KEY`              | Default demo inference provider |

> Never commit `.env.local`, API keys, access tokens, or other secrets.

#### 4. Build and verify

```bash
pnpm build
pnpm typecheck
pnpm test
```

#### 5. Start the development server

```bash
pnpm dev
```

Then open:

**http://localhost:3000**

### What should you see?

You can explore:

* Agent actions
* Policy decisions
* Allow / Block / Escalate outcomes
* Human review
* Telemetry
* Audit information

### Your first contribution

Once Aegisora is running, the easiest way to contribute is:

```text
Run Aegisora
     ↓
Find a problem
     ↓
Open an issue
     ↓
Pick a good first issue
     ↓
Submit a PR
```

Aegisora is intentionally designed so developers can experiment with the runtime, add policies, improve detection rules, build integrations and contribute security test cases.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the complete contribution workflow.

---

## 📄 License

This project is open-source under the [MIT License](./LICENSE).

---
## 🤝 Contributing

### 🚀 Make Your First Contribution

You do **not** need to understand the entire codebase before contributing.

A simple first contribution can look like this:

```text id="p5t9a1"
1. Pick an issue
       ↓
2. Understand the problem
       ↓
3. Make a small change
       ↓
4. Add or update tests
       ↓
5. Open a pull request
```

### Good places to start

Look for issues labeled:

* `good first issue`
* `help wanted`
* `documentation`
* `security`
* `testing`

You can also contribute without writing core code.

Ideas include:

* Add a new security policy
* Add an attack / abuse test case
* Add an agent-framework integration
* Improve documentation
* Improve examples
* Add benchmark cases
* Report a false positive
* Report a false negative
* Improve developer tooling

### 🛠️ Development Workflow

```bash
git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
pnpm install

git checkout -b feature/your-feature

pnpm typecheck
pnpm test
pnpm build
```

Then commit your changes and open a pull request.

### 💬 Join the Community

Have an idea, question or security finding?

Join the [Discord community](https://discord.gg/8CM3PpQRT5).

You can also use:

* [GitHub Issues](https://github.com/aegisora-ai/aegisora.ai/issues)
* [GitHub Discussions](https://github.com/aegisora-ai/aegisora.ai/discussions)
* [CONTRIBUTING.md](./CONTRIBUTING.md)

### 🔐 Security Contributions

Found a security issue?

Please follow the responsible disclosure process described in [`SECURITY.md`](./SECURITY.md).

> **Aegisora gets better every time someone tests it, challenges it, documents it or contributes code.**

### 🌍 Build With Us

Aegisora is not intended to be built by one person.

We want developers to help shape:

* Runtime policies
* Detection rules
* Agent integrations
* Security benchmarks
* Developer tooling
* Documentation
* The future architecture of open-source agent security

---

<div align="center">

<strong>Aegisora</strong>

<br>

<em>The Zero-Trust Runtime Security & Governance Layer for Autonomous AI Agents</em>

<br><br>

<a href="https://github.com/aegisora-ai/aegisora.ai">GitHub</a>
&nbsp;·&nbsp;
<a href="https://aegisora-ai.vercel.app">Live Demo</a>
&nbsp;·&nbsp;
<a href="https://discord.gg/8CM3PpQRT5">Discord</a>

</div>
