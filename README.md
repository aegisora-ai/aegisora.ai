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

- **Zero-Trust Action Proxy** — Every agent action and tool call is intercepted and validated in real time before execution; nothing reaches production systems unchecked.
- **The Human Review Queue** — High-risk or ambiguous actions are escalated asynchronously for human approval instead of being blindly blocked, preserving agent throughput while keeping a human in the loop for consequential decisions.
- **Prompt Injection Firewall** — Detects and neutralizes adversarial inputs designed to override system instructions or hijack agent behavior.
- **PII Data Masking** — Automatically detects and redacts sensitive data such as credit card numbers, national IDs/SSNs, email addresses, and other regulated data classes from agent inputs and outputs before it can leak.
- **Live Telemetry & Reasoning Trace** — Full observability into agent workflows, decision paths, and policy outcomes (approved / flagged / blocked) as they happen, with a complete audit trail for compliance.
- **Execution Integrity Proofs** — Cryptographic provenance for workload execution, enabling verifiable, tamper-evident audit records.

For our threat model and disclosure policy, see [`SECURITY.md`](./SECURITY.md).

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

There are two ways to get started, depending on what you're trying to do.

### Option A — Add the SDK to an existing project

Use this if you already have an agent and want to govern its actions through Aegisora.

```bash
npm install @aegisora/sdk
```

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

**Expected behavior:**
- Safe requests are allowed and completed through the governed runtime.
- Security-sensitive requests are intercepted by the enforcement layer and can be blocked or escalated before completion.

All Aegisora packages are published on npm under the [`@aegisora`](https://www.npmjs.com/org/aegisora) scope. See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full package list and what each one covers.

### Option B — Run the full demo/dashboard locally

Use this if you want to explore the Human Review Queue, telemetry dashboard, and policy engine yourself.

#### Prerequisites

- Node.js 18+
- pnpm (recommended), npm, or yarn
- Git

#### 1. Clone and install

```bash
git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
pnpm install
```

#### 2. Configure environment variables

```bash
cp .env.example .env.local
```

At minimum, `.env.local` requires:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL, used for auth and policy/audit storage |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase key, used by the enforcement layer |
| `GROQ_API_KEY` | Inference key for the default demo agent/provider |

See `.env.example` for the complete list.

> **Important:** Never commit `.env.local`, API keys, access tokens, or other secrets to the repository.

#### 3. Build and verify

```bash
pnpm build
pnpm typecheck
```

#### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

#### 5. Run the test suite

```bash
pnpm test
```

The repository includes runtime security, provider-boundary, identity, lifecycle, and SDK integration tests.

---

## 🤝 Contributing

Aegisora is built in the open, and contributions of any size are welcome — from fixing a typo to designing a new detection rule for the policy engine, to helping us validate the metrics in the [Benchmarks](#-metrics--benchmarks) section above.

### Contribution Workflow

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes.
4. Add or update tests where appropriate.
5. Commit your changes.
6. Push your branch.
7. Open a Pull Request.

Check the [Issues](https://github.com/aegisora-ai/aegisora.ai/issues) tab for tasks labeled `good first issue`.

Join the [Discord](https://discord.gg/8CM3PpQRT5) community to connect with contributors and discuss the project.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full workflow and coding standards.

---

## 📄 License

This project is open-source under the [MIT License](./LICENSE).

---

## ✨ Contributors

Thanks to all the people who contribute to Aegisora. This project follows the [all-contributors](https://allcontributors.org/) specification.

Contributions of any kind are welcome — code, documentation, testing, security research, integrations, ideas, and more.

<a href="https://github.com/aegisora-ai/aegisora.ai/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=aegisora-ai/aegisora.ai" alt="Aegisora contributors">
</a>

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
