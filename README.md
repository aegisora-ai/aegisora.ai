<div align="center">
  <h1 align="center">Aegisora</h1>
  <p align="center">
    <strong>Zero-trust runtime security and governance layer for autonomous AI agents</strong>
  </p>
  <p align="center">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14%2B-black" alt="Next.js"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-38B2AC" alt="Tailwind CSS"></a>
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
   git clone https://github.com/KULLANICI_ADINIZ/aegisora-site.git
   cd aegisora-site
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

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

### Sırada Ne Var?

Bu adımı tamamladıktan sonra projeni GitHub'a public (açık kaynak) olarak göndermek için:

```bash
git init
git add .
git commit -m "feat: complete open-source release setup for Aegisora"
git remote add origin https://github.com/KULLANICI_ADINIZ/aegisora-site.git
git branch -M main
git push -u origin main
```

_(Not: `ozereray` kısmına kendi GitHub kullanıcı adını yazmayı unutma.)_ Bu komutlarla birlikte projen global dünyaya tam anlamıyla açık kaynak olarak açılmış olacaktır!
