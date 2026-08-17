# Contributing to Aegisora

First of all, thank you for your interest in contributing to Aegisora.

Our mission is not simply to build another AI security tool. We are building the definitive **open runtime governance layer** for autonomous AI systems. Every contribution—whether it is code, architecture design, security research, or documentation—helps secure the future of agentic AI.

This document outlines the architecture, development workflow, and coding standards required to contribute to the Aegisora ecosystem.

---

## 🏗️ Architecture & Monorepo Setup

Aegisora is architected as a **Monorepo** managed with [Turborepo](https://turbo.build/) and uses `pnpm` for efficient package management. This allows us to scale our Core Engine, UI components, and SDKs securely in an isolated yet cohesive environment.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

### Local Development Environment

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aegisora-ai/aegisora.ai.git
   cd aegisora.ai
   ```

2. **Install dependencies:** (Do not use `npm` or `yarn`. We strictly use `pnpm` across the workspace).

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server:** (This uses Turborepo to spin up all packages and apps simultaneously).

   ```bash
   pnpm dev
   ```

---

## 🌿 Branching Strategy

We use a strict branching model to maintain the integrity of our Zero-Trust architecture. Never commit directly to `main`.

Create a branch from `main` using the following prefixes:

- `feat/` — For new architectural features or capabilities.
- `fix/` — For bug fixes and patches.
- `sec/` — For security patches or vulnerability mitigations.
- `docs/` — For documentation updates.
- `refactor/` — For codebase restructuring without logic changes.

Example: `git checkout -b feat/add-pii-masking-engine`

---

## 💬 Commit Convention

Aegisora follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. This ensures our automated CI/CD pipelines can accurately generate semantic versions and changelogs.

**Format:** `<type>(<scope>): <subject>`

**Allowed Types:**

- `feat`: A new feature (e.g., `feat(proxy): add rate limiting`)
- `fix`: A bug fix (e.g., `fix(auth): resolve token expiration issue`)
- `docs`: Documentation only changes
- `test`: Adding missing tests or correcting existing tests
- `perf`: A code change that improves latency or performance
- `sec`: Security-related changes or dependency bumps

---

## 🔄 Pull Request Lifecycle

To ensure enterprise-grade stability, every Pull Request must adhere to the following checklist:

1. **Focused Scope:** Solve only one problem per PR. Large, monolithic PRs will be rejected.
2. **Zero-Latency Impact:** Aegisora is a runtime proxy. If your code introduces measurable latency, it must be optimized before review.
3. **Tests:** Include unit and integration tests for new features. Local tests must pass (`pnpm test`).
4. **Documentation:** Update relevant `.md` files and inline JSDoc comments.
5. **No Breaking Changes:** Unless discussed in a prior Issue, maintain backwards compatibility.

Passing CI checks is mandatory, but it does not guarantee automatic approval. A Core Maintainer must review the PR for architectural and security compliance.

---

## 🛡️ Coding Standards & Philosophy

Every line of code committed to Aegisora must improve at least one of our core pillars: **Security, Reliability, Performance, or Observability.**

- **Zero Trust by Default:** Never trust the input. Every prompt and tool call must be validated.
- **Explicit over Implicit:** Write readable code. Avoid "clever" abstractions that obscure the logic.
- **Fail Securely:** If a process fails, it must fail into a secure, blocked, and logged state.

---

## 🚨 Reporting Security Vulnerabilities

Do not open a public issue for security vulnerabilities. Please refer to our `SECURITY.md` for instructions on responsible disclosure.

---

Thank you for helping us build a secure infrastructure for the AI era.
