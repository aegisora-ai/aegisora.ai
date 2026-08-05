<div align="center">

  <a href="https://www.producthunt.com/posts/aegisora" target="_blank">
    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=594435&theme=dark" alt="Aegisora - Zero-Trust Runtime Security for AI Agents on Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
  </a>

  <h1>Aegisora</h1>
  <p><strong>The Zero-Trust Runtime Security & Governance Layer for Autonomous AI Agents</strong></p>

  <p>
    <a href="https://aegisora-ai.vercel.app"><strong>Live Demo</strong></a> &nbsp;·&nbsp;
    <a href="ARCHITECTURE.md"><strong>Architecture</strong></a> &nbsp;·&nbsp;
    <a href="SECURITY.md"><strong>Security</strong></a> &nbsp;·&nbsp;
    <a href="https://discord.gg/8CM3PpQRT5"><strong>Discord</strong></a>
  </p>

  <p>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14%2B-black" alt="Next.js"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-38B2AC" alt="Tailwind CSS"></a>
    <a href="https://discord.gg/8CM3PpQRT5"><img src="https://img.shields.io/badge/Discord-Join%20us-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
  </p>

  <!-- ALL-CONTRIBUTORS-BADGE:START -->
  <p><a href="#contributors-"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" alt="All Contributors"></a></p>
  <!-- ALL-CONTRIBUTORS-BADGE:END -->

</div>

---

## 🚀 Overview

As enterprises grant autonomous AI agents direct access to critical databases, internal tools, and production infrastructure, the attack surface for prompt injection, data exfiltration, and unauthorized action execution grows exponentially — and traditional security tooling was never designed to govern non-deterministic, self-directed software.

**Aegisora** sits between your AI agents and the systems they act upon as a real-time, zero-trust enforcement layer. Every tool call, every action, and every output is intercepted, evaluated against policy, and logged — **before** it ever touches production.

Our core design philosophy is solving what we call the **Binary Trap**: the false choice between blindly allowing an agent action and blindly blocking it. Instead of forcing a black-and-white decision on ambiguous or high-risk requests, Aegisora introduces a third state — **asynchronous human escalation** — so security teams get a governance layer that flexes with real-world ambiguity instead of breaking the workflow.

---

## 🎯 The Problem We Solve

Conventional security systems force a binary outcome on every request: **allow** or **block**. For deterministic, low-risk traffic this works. For autonomous AI agents making judgment calls in ambiguous, high-stakes situations, it doesn't — organizations are left choosing between over-blocking (killing agent productivity) or over-permitting (accepting unacceptable risk).

Aegisora resolves this with a three-state decision model:

| State | Trigger | Outcome |
| :--- | :--- | :--- |
| ✅ **Allow** | Low-risk, policy-compliant request | Executes instantly via the deterministic fast-path (**< 10ms**) |
| 🚫 **Block** | Clear policy violation or known attack pattern | Rejected immediately, fully logged |
| 🕵️ **Escalate** | Ambiguous or high-risk request | Routed to the **Human Review Queue** for asynchronous approval — without breaking the agent's workflow |

---

## 🛡️ Core Capabilities

- **Zero-Trust Action Proxy** — Every agent action and tool call is intercepted and validated in real time before execution; nothing reaches production systems unchecked.
- **The Human Review Queue** — High-risk or ambiguous actions are escalated asynchronously for human approval instead of being blindly blocked, preserving agent throughput while keeping a human in the loop for consequential decisions.
- **Prompt Injection Firewall** — Detects and neutralizes adversarial inputs designed to override system instructions or hijack agent behavior.
- **PII Data Masking** — Automatically detects and redacts sensitive data (credit card numbers, national IDs/SSNs, email addresses, and other regulated data classes) from agent inputs and outputs before it can leak.
- **Live Telemetry & Reasoning Trace** — Full observability into agent workflows, decision paths, and policy outcomes (approved / flagged / blocked) as they happen, with a complete audit trail for compliance.
- **Execution Integrity Proofs** — Cryptographic provenance for workload execution, enabling verifiable, tamper-evident audit records.

For a full breakdown of the request lifecycle and system internals, see [**ARCHITECTURE.md**](ARCHITECTURE.md). For our threat model and disclosure policy, see [**SECURITY.md**](SECURITY.md).

---

## 🏗️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database & Auth** | Supabase |
| **AI Integration** | Groq API / LLM Proxies |
| **Deployment** | Vercel Edge Network |

---

## 📦 Getting Started Locally

**Prerequisites:** Node.js 18+ and npm or yarn.

1. **Clone the repository**

   ```bash
   git clone [https://github.com/ozereray/aegisora.ai.git](https://github.com/ozereray/aegisora.ai.git)
   cd aegisora.ai

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Populate `.env.local` with your API keys and Supabase credentials.

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🤝 Contributing

Aegisora is built in the open, and contributions of any size are welcome — from fixing a typo to designing a new detection rule for the policy engine.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a Pull Request

Check the [Issues](https://github.com/ozereray/aegisora.ai/issues) tab for tasks labeled `good first issue`, and join the [Discord](https://discord.gg/8CM3PpQRT5) to connect with the community.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

## ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ozereray"><img src="https://avatars.githubusercontent.com/u/118771126?v=4?s=100" width="100px;" alt="Eray Özer"/><br /><sub><b>Eray Özer</b></sub></a><br /><a href="https://github.com/ozereray/aegisora.ai/commits?author=ozereray" title="Code">💻</a> <a href="https://github.com/ozereray/aegisora.ai/commits?author=ozereray" title="Documentation">📖</a> <a href="#maintenance-ozereray" title="Maintenance">🚧</a> <a href="#infra-ozereray" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
