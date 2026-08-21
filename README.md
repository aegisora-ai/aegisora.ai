<div align="center">

  <a href="https://github.com/aegisora-ai/aegisora.ai">
    <img src="assets/aegisora-logo.png" alt="Aegisora Logo" width="120" height="120">
  </a>

  <h1>Aegisora</h1>

  <p>
    <strong>The Zero-Trust Runtime Security & Governance Layer for Autonomous AI Agents</strong>
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

  <!-- ALL-CONTRIBUTORS-BADGE:START -->
  <p>
    <a href="#-contributors">
      <img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" alt="All Contributors">
    </a>
  </p>
  <!-- ALL-CONTRIBUTORS-BADGE:END -->

</div>

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

## 💼 Why Aegisora — Enterprise Value

Security tooling is only worth adopting if it makes the organization **faster and safer at the same time**. If a governance layer reduces incidents but multiplies the number of tickets a human has to review, it has simply moved the cost from "security risk" to "operational overhead" — and most enterprises will correctly reject that trade.

Aegisora is designed around a single constraint: **automation coverage should increase, and human review load should trend down over time**, not up. Concretely, this means:

- **Most traffic never reaches a human.** The deterministic fast-path (Allow) and the hard-block path (Block) are designed to resolve the large majority of requests without any manual step, because they are backed by explicit, auditable policy rules rather than ad-hoc judgment calls.
- **Escalation is a last resort, not a default.** A request only reaches the Human Review Queue when it cannot be confidently classified as low-risk or as a clear violation. This is the same principle used in fraud detection and content moderation pipelines at scale: humans review the ambiguous tail, not the whole distribution.
- **Every escalation ships with context, not just a request.** Reviewers see the reasoning trace, the policy rule(s) that triggered ambiguity, and prior similar decisions — cutting the time needed to resolve each case compared to reviewing a raw request cold.
- **Policies are meant to tighten over time.** As an organization approves or rejects escalated cases, those decisions are logged and can be fed back into policy rules, narrowing the set of requests that require escalation in the future. See [Metrics & Benchmarks](#-metrics--benchmarks) for how we plan to measure this in production deployments.
- **Everything is auditable by default.** For regulated industries, the cost of manual review is often not the review itself but the compliance documentation around it. Aegisora's audit trail is generated automatically as a byproduct of enforcement, not as a separate task.

> **Honest scope note:** Aegisora reduces review load primarily by (a) auto-resolving the clear-cut majority of requests and (b) making each escalated review faster and better-informed. It does not eliminate human review for genuinely ambiguous, high-stakes actions — nor should it. The goal is a governance layer that scales sublinearly with agent traffic, not one that removes accountability.

---

## ❌ The Problem We Solve

Conventional security systems force a binary outcome on every request: **allow** or **block**.

For deterministic, low-risk traffic, this works fine. But for autonomous AI agents making judgment calls in ambiguous, high-stakes situations, it doesn't — organizations are left choosing between:

- **Over-blocking**, which kills agent productivity, or
- **Over-permitting**, which means accepting unacceptable risk.

Our core design philosophy is solving what we call the **Binary Trap** — the false choice between blindly allowing an agent action and blindly blocking it. Instead of forcing a black-and-white decision on ambiguous or high-risk requests, Aegisora introduces a third state so security teams get a governance layer that flexes with real-world ambiguity instead of breaking the workflow.

### Three-State Decision Model

| **State**       | **Trigger**                                    | **Outcome**                                                                                       |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| ✅ **Allow**     | Low-risk, policy-compliant request               | Executes instantly via the deterministic fast-path (**< 10ms**)                                  |
| ⛔ **Block**     | Clear policy violation or known attack pattern   | Rejected immediately and fully logged                                                             |
| ⏸️ **Escalate**  | Ambiguous or high-risk request                   | Routed to the **Human Review Queue** for asynchronous approval, without breaking the agent workflow |

---

## 🧠 How Risk Classification Works

Every intercepted action — a tool call, a database query, an outbound API request — is evaluated by the **Policy & Risk Engine** before execution. The decision pipeline works as follows:

1. **Static policy match** — The request is checked against explicit, deterministic rules (allow-lists, deny-lists, scoped permissions per agent identity, rate limits, data-class restrictions). A match here resolves the request immediately as **Allow** or **Block**, with no ambiguity and no human involvement.
2. **Signal extraction** — For requests that don't match a static rule outright, Aegisora extracts risk signals: the sensitivity class of the data or system being touched, the agent's prior behavior in the session, deviation from its declared task, and known adversarial patterns (see [Prompt Injection Firewall](#️-core-capabilities)).
3. **Confidence scoring** — Signals are combined into a confidence score. Requests above the "safe" threshold resolve as **Allow**; requests above the "clear violation" threshold resolve as **Block**; everything in between — where the system cannot confidently say either way — is routed to **Escalate**.
4. **Full trace logging** — Regardless of outcome, the signals, the rule(s) evaluated, and the resulting score are written to the audit log. This is what allows reviewers (and auditors) to see *why* a decision was made, not just *what* was decided.

This threshold-based design is intentional: it means the **size of the Escalate bucket is a tunable policy decision**, not a fixed property of the system. Organizations can start conservative (wider escalation net while trust is being established) and narrow it deliberately as policies are validated — rather than trusting an opaque model's judgment from day one.

For the full technical breakdown of the request lifecycle, see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## 🧑‍⚖️ The Human Review Queue — Efficiency by Design

The question that matters most for adoption isn't "does Aegisora add a review step?" — it's **"does the total human effort go down compared to how this is handled today?"** Here's the structural comparison:

| | **Status quo (no governance layer / manual gatekeeping)** | **With Aegisora** |
| --- | --- | --- |
| **What gets reviewed** | Either nothing is reviewed (risk is simply accepted), or every sensitive action requires manual sign-off regardless of actual risk | Only requests the Policy & Risk Engine cannot confidently resolve |
| **Context available to reviewer** | Raw request, reconstructed manually from logs or by asking the requester | Full reasoning trace: which signals fired, which policy came close to matching, prior similar decisions |
| **Time to resolve a review** | Variable and often slow — requires the reviewer to reconstruct context first | Reduced, because context is pre-assembled by the engine |
| **Review volume over time** | Flat or grows linearly with agent traffic | Designed to shrink as approved/rejected escalations are fed back into policy rules |
| **Auditability** | Manual, often reconstructed after the fact for compliance | Automatic byproduct of every decision, Allow/Block/Escalate alike |

The Human Review Queue is not a replacement for automation — it is the mechanism that lets automation expand safely. Every case a security team resolves and encodes back into policy is a case that no longer needs to reach a human next time it occurs.

---

## 📊 Metrics & Benchmarks

We know that claims of "improved efficiency" or "high classification accuracy" are only meaningful when backed by numbers — and we'd rather be transparent about what's measured today than publish figures that haven't been validated in production.

**Status: benchmarking in progress.** The following metrics are the ones we consider necessary to evaluate Aegisora for enterprise adoption, and are being tracked as part of our roadmap:

| Metric | What it tells you | Status |
| --- | --- | --- |
| Classification precision/recall (Allow vs. Block vs. Escalate) | How often the engine's automated decision matches the decision a human reviewer would have made | 🚧 In progress |
| Escalation rate over time, per policy set | Whether the Human Review Queue volume actually decreases as policies mature | 🚧 In progress |
| Median time-to-resolution per escalated case | Whether context pre-assembly measurably speeds up manual review vs. a cold request | 🚧 In progress |
| False-block rate | How often legitimate, safe actions are incorrectly blocked (productivity cost) | 🚧 In progress |
| False-allow rate | How often risky actions are incorrectly auto-approved (security cost) | 🚧 In progress |

If you're evaluating Aegisora for production use and can share (even anonymized) traffic patterns or a pilot deployment, we'd like to work with you to populate this table with real numbers — see [Contributing](#-contributing) or reach out on [Discord](https://discord.gg/8CM3PpQRT5). We will update this section as soon as we have data we're confident stands behind these claims, rather than before.

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
