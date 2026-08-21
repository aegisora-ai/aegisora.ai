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

Aegisora is an open-source, zero-trust runtime governance layer designed specifically for autonomous AI agents.

Instead of relying on traditional allow/block firewalls that can break non-deterministic agent workflows, Aegisora utilizes **Asynchronous Human Escalation** to pause, quarantine, and verify high-risk API calls and database queries before execution.

---

## Aegisora SDK Quickstart

Get a governed AI agent running locally with the Aegisora SDK.

### 1. Clone and install

```bash
git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
pnpm install
```

### 2. Build and verify

```bash
pnpm build
pnpm typecheck
```

### 3. Create a governed agent

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

### 4. Expected behavior

Safe requests are allowed and completed through the governed runtime.

Security-sensitive requests are intercepted by the enforcement layer and can be blocked before completion.

### 5. Run the built-in test suite

```bash
pnpm test
```

The repository includes runtime security, provider-boundary, identity, lifecycle, and SDK integration tests.

## 🎯 Overview

As enterprises grant autonomous AI agents direct access to critical databases, internal tools, and production infrastructure, the attack surface for prompt injection, data exfiltration, and unauthorized action execution grows exponentially — and traditional security tooling was never designed to govern non-deterministic, self-directed software.

**Aegisora** sits between your AI agents and the systems they act upon as a real-time, zero-trust enforcement layer.

Every tool call, every action, and every output is intercepted, evaluated against policy, and logged — **before** it ever touches production.

Our core design philosophy is solving what we call the **Binary Trap**: the false choice between blindly allowing an agent action and blindly blocking it.

Instead of forcing a black-and-white decision on ambiguous or high-risk requests, Aegisora introduces a third state — **asynchronous human escalation** — so security teams get a governance layer that flexes with real-world ambiguity instead of breaking the workflow.

---

## ❌ The Problem We Solve

Conventional security systems force a binary outcome on every request: **allow** or **block**.

For deterministic, low-risk traffic this works.

For autonomous AI agents making judgment calls in ambiguous, high-stakes situations, it doesn't — organizations are left choosing between over-blocking (killing agent productivity) or over-permitting (accepting unacceptable risk).

Aegisora resolves this with a three-state decision model:

| **State**        | **Trigger**                                    | **Outcome**                                                                                        |
| ---------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ✅ **Allow**      | Low-risk, policy-compliant request             | Executes instantly via the deterministic fast-path (**< 10ms**)                                    |
| ⛔ **Block**     | Clear policy violation or known attack pattern | Rejected immediately and fully logged                                                              |
| ⏸️ **Escalate** | Ambiguous or high-risk request                 | Routed to the **Human Review Queue** for asynchronous approval without breaking the agent workflow |

---

## 🛡️ Core Capabilities

* **Zero-Trust Action Proxy** — Every agent action and tool call is intercepted and validated in real time before execution; nothing reaches production systems unchecked.

* **The Human Review Queue** — High-risk or ambiguous actions are escalated asynchronously for human approval instead of being blindly blocked, preserving agent throughput while keeping a human in the loop for consequential decisions.

* **Prompt Injection Firewall** — Detects and neutralizes adversarial inputs designed to override system instructions or hijack agent behavior.

* **PII Data Masking** — Automatically detects and redacts sensitive data such as credit card numbers, national IDs/SSNs, email addresses, and other regulated data classes from agent inputs and outputs before it can leak.

* **Live Telemetry & Reasoning Trace** — Full observability into agent workflows, decision paths, and policy outcomes (approved / flagged / blocked) as they happen, with a complete audit trail for compliance.

* **Execution Integrity Proofs** — Cryptographic provenance for workload execution, enabling verifiable, tamper-evident audit records.

For a full breakdown of the request lifecycle and system internals, see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

For our threat model and disclosure policy, see [`SECURITY.md`](./SECURITY.md).

---

## 🧰 Tech Stack

| **Layer**           | **Technology**         |
| ------------------- | ---------------------- |
| **Framework**       | Next.js (App Router)   |
| **Language**        | TypeScript             |
| **Styling**         | Tailwind CSS           |
| **Database & Auth** | Supabase               |
| **AI Integration**  | Groq API / LLM Proxies |
| **Deployment**      | Vercel Edge Network    |

---

## 🚀 Getting Started Locally

### Prerequisites

* Node.js 18+
* npm or yarn
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
```

### 2. Install Dependencies

```bash
npm install
```

Or:

```bash
yarn install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your API keys and Supabase credentials.

> **Important:** Never commit `.env.local`, API keys, access tokens, or other secrets to the repository.

### 4. Run the Development Server

```bash
npm run dev
```

Or:

```bash
yarn dev
```

Open http://localhost:3000 to view the application.

---

## 🤝 Contributing

Aegisora is built in the open, and contributions of any size are welcome — from fixing a typo to designing a new detection rule for the policy engine.

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

Thanks to all the people who contribute to Aegisora.

This project follows the [all-contributors](https://allcontributors.org/) specification.

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

<a href="https://github.com/aegisora-ai/aegisora.ai">
  GitHub
</a>
&nbsp;·&nbsp;
<a href="https://aegisora-ai.vercel.app">
  Live Demo
</a>
&nbsp;·&nbsp;
<a href="https://discord.gg/8CM3PpQRT5">
  Discord
</a>

</div>
