<div align="center">

<strong>Aegisora</strong>

Zero-trust runtime security and governance for autonomous AI agents.

<br>

<a href="https://github.com/aegisora-ai/aegisora.ai">GitHub</a>
|
<a href="https://aegisora-ai.vercel.app">Live Demo</a>
|
<a href="https://discord.gg/8CM3PpQRT5">Discord</a>

<br><br>

<img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License">
<img src="https://img.shields.io/badge/Release-0.1.2-green.svg" alt="Release 0.1.2">
<img src="https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg" alt="Node.js 18+">
<img src="https://img.shields.io/badge/TypeScript-5%2B-blue.svg" alt="TypeScript 5+">

</div>

---

## What is Aegisora?

Aegisora is an open-source zero-trust runtime security and governance layer for autonomous AI agents.

It places a protected enforcement boundary between an AI agent and consequential execution.

Instead of allowing an agent action first and reviewing it afterward, Aegisora evaluates protected actions before execution proceeds.

The core principle is simple:

**Evaluate before execution. Enforce the decision. Keep the evidence.**

## Why Aegisora?

Autonomous AI agents increasingly interact with:

- APIs
- databases
- tools
- files
- infrastructure
- model providers
- external services

Aegisora brings governance directly into that execution path.

The objective is to ensure that protected actions pass through security, identity, policy, risk, and decision controls before execution reaches the protected boundary.

## Zero-Trust Execution Model

```text
Agent
  |
  v
Runtime Gateway
  |
  v
Context Resolution
  |
  v
Identity & Access
  |
  v
Security Analysis
  |
  v
Policy Evaluation
  |
  v
Risk Analysis
  |
  v
Decision Resolution
  |
  v
Enforcement
  |
  +---- BLOCK
  |
  +---- ESCALATE
  |
  +---- ALLOW
           |
           v
       Execution
           |
           v
      Audit Evidence
```

Protected execution happens downstream of the enforcement boundary.

## Enforcement Decisions

**ALLOW**

The protected action passed the configured governance checks and may proceed.

**BLOCK**

The protected action is denied.

Protected provider or tool execution must not proceed.

**ESCALATE**

The protected action requires review or additional authorization.

Protected execution must not proceed until the required review path is satisfied.

The core enforcement invariant is:

```text
BLOCK     -> protected execution = 0
ESCALATE  -> protected execution = 0
ALLOW     -> protected execution may proceed
```

## Install

The recommended developer entry point is the public SDK:

```bash
npm install @aegisora/sdk@0.1.2
```

## Quick Start

```ts
import { AegisoraClient } from "@aegisora/sdk";

const client = new AegisoraClient();

console.log(client);
```

See the SDK documentation and exported API for the currently supported developer workflow.

## Public Packages

| Package | Version | Purpose |
|---|---|---|
| `@aegisora/core` | 0.1.2 | Core types and runtime contracts |
| `@aegisora/audit` | 0.1.2 | Decision and audit evidence |
| `@aegisora/observability` | 0.1.2 | Runtime observability |
| `@aegisora/policy-engine` | 0.1.2 | Policy evaluation |
| `@aegisora/security-engine` | 0.1.2 | Security analysis |
| `@aegisora/plugins` | 0.1.2 | Plugin infrastructure |
| `@aegisora/storage` | 0.1.2 | Storage adapters |
| `@aegisora/runtime` | 0.1.2 | Zero-trust execution runtime |
| `@aegisora/sdk` | 0.1.2 | Developer SDK |

## Release 0.1.2

Aegisora 0.1.2 is the public release of the Aegisora runtime security and governance stack.

The release work includes validation across the public package surface and the protected execution path.

Key verification areas include:

- public npm installation
- package dependency resolution
- SDK import
- runtime import
- security engine import
- policy engine import
- ALLOW execution
- forged identity rejection
- policy BLOCK enforcement
- ESCALATE enforcement
- provider non-execution on BLOCK
- provider non-execution on ESCALATE
- audit decision evidence

## Architecture

Aegisora is organized around a layered runtime security and governance pipeline:

- Context Resolution
- Identity & Access
- Security Analysis
- Policy Evaluation
- Risk Analysis
- Decision Resolution
- Enforcement
- Execution
- Audit Evidence

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the detailed architecture.

## Security

Security controls are applied before protected execution.

Relevant security capabilities include:

- identity enforcement
- permission evaluation
- prompt-injection analysis
- PII detection
- policy enforcement
- risk analysis
- provider execution boundaries
- plugin governance
- audit evidence
- decision tracing

See [SECURITY.md](./SECURITY.md) for the security model and security reporting process.

## Development

### Prerequisites

- Node.js 18+
- pnpm
- Git
- TypeScript

### Clone

```bash
git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
```

### Install dependencies

```bash
pnpm install
```

### Build

```bash
pnpm -r build
```

### Type Check

```bash
pnpm -r exec tsc --noEmit
```

## Contributing

Aegisora is open source and welcomes contributions.

Before submitting changes, review:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [SECURITY.md](./SECURITY.md)

## Community

- GitHub: https://github.com/aegisora-ai/aegisora.ai
- Discord: https://discord.gg/8CM3PpQRT5
- Live Demo: https://aegisora-ai.vercel.app

## License

Aegisora is released under the MIT License.

See [LICENSE](./LICENSE).

<div align="center">

<strong>Aegisora</strong>

Zero-trust runtime security and governance for autonomous AI agents.

<br><br>

<a href="https://github.com/aegisora-ai/aegisora.ai">GitHub</a>
|
<a href="https://aegisora-ai.vercel.app">Live Demo</a>
|
<a href="https://discord.gg/8CM3PpQRT5">Discord</a>

</div>
