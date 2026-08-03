<p align="center">
  🔗 <a href="https://aegisora-ai.vercel.app"><strong>Live Demo</strong></a>
  &nbsp;·&nbsp;
  🏛️ <a href="ARCHITECTURE.md"><strong>Architecture</strong></a>
  &nbsp;·&nbsp;
  🛡️ <a href="SECURITY.md"><strong>Security</strong></a>
  &nbsp;·&nbsp;
  💬 <a href="https://discord.gg/8CM3PpQRT5"><strong>Discord</strong></a>
</p>

<div align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <h1 align="center">Aegisora</h1>
  <p align="center">
    <strong>Zero-trust runtime security and governance layer for autonomous AI agents</strong>
  </p>
  <p align="center">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14%2B-black" alt="Next.js"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-38B2AC" alt="Tailwind CSS"></a>
    <a href="https://discord.gg/8CM3PpQRT5"><img src="https://img.shields.io/badge/Discord-Join%20us-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
  </p>
  <p align="center">
    🔗 <a href="https://aegisora-ai.vercel.app"><strong>Live Demo</strong></a>
    &nbsp;·&nbsp;
    💬 <a href="https://discord.gg/8CM3PpQRT5"><strong>Join our Discord</strong></a>
  </p>
</div>

---

## 🚀 About Aegisora

As AI systems and autonomous agents are granted direct access to critical enterprise infrastructure, tools, and data, the risk surface for prompt injection, data leakage, and unauthorized actions grows dramatically.

**Aegisora** is an enterprise-grade runtime security platform that provides a real-time, zero-trust layer between your AI agents and the systems they interact with — intercepting every action before it executes, validating it against policy, and giving you full visibility into what your agents are actually doing.

---

## 🛡️ Core Features

- **Zero-Trust Proxy:** Intercepts and validates every agent action and tool-call in real time before execution.
- **Prompt Injection Firewall:** Blocks adversarial inputs attempting to override system instructions or hijack agent behavior.
- **PII Data Masking:** Automatically redacts sensitive information (SSNs, credit card numbers, emails, and other confidential data) from agent inputs and outputs.
- **Live Telemetry & Reasoning Trace:** Complete visibility into agent workflows, decision paths, and policy decisions (approved / flagged / blocked) as they happen.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase
- **AI Integration:** Groq API / LLM Proxies

---

## 📦 Getting Started Locally

To run Aegisora locally on your machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ozereray/aegisora.ai.git
   cd aegisora.ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   Copy the example environment file and fill in your API keys:

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🤝 Contributing

Aegisora is built in the open, and contributions of any size are welcome — from fixing a typo to designing a new detection rule for the policy engine.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a Pull Request

Check the [Issues](https://github.com/ozereray/aegisora.ai/issues) tab for tasks labeled `good first issue` if you're not sure where to start, and join the [Discord](https://discord.gg/8CM3PpQRT5) to chat with the community.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

## Contributors ✨

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

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
