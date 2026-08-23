<div align="center">

  <p>
    <img
      src="assets/aegisora-readme-header.png"
      alt="Aegisora"
      width="760"
    />
  </p>

  <p>
    <strong>Open-source runtime security for AI agents.</strong>
  </p>

  <p>
    Intercept every agent action before execution and decide:
    <strong>ALLOW</strong>, <strong>BLOCK</strong>, or <strong>ESCALATE</strong>.
  </p>

  <p>
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License">
    </a>
    <a href="https://github.com/aegisora-ai/aegisora.ai/releases">
      <img src="https://img.shields.io/github/v/release/aegisora-ai/aegisora.ai?color=green&label=release" alt="Release">
    </a>
    <a href="https://github.com/aegisora-ai/aegisora.ai/actions">
      <img src="https://img.shields.io/github/actions/workflow/status/aegisora-ai/aegisora.ai/ci.yml?branch=main&label=CI" alt="CI status">
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

  <p>
    <a href="https://www.producthunt.com/posts/aegisora" target="_blank">
      <img
        src="https://img.shields.io/badge/Product%20Hunt-Featured%20on%20PH-FF6154?style=for-the-badge&logo=producthunt&logoColor=white"
        alt="Product Hunt Featured"
      />
    </a>
  </p>

  <p>
    <a href="https://aegisora-ai.vercel.app"><strong>Live Demo</strong></a>
    &nbsp;┬À&nbsp;
    <a href="https://github.com/aegisora-ai/aegisora.ai/blob/main/ARCHITECTURE.md"><strong>Architecture</strong></a>
    &nbsp;┬À&nbsp;
    <a href="https://github.com/aegisora-ai/aegisora.ai/blob/main/SECURITY.md"><strong>Security</strong></a>
    &nbsp;┬À&nbsp;
    <a href="https://discord.gg/8CM3PpQRT5"><strong>Discord</strong></a>
  </p>

</div>

> **Aegisora sits between your AI agent and the systems it can act on.**
> Every tool call is evaluated at runtime before execution.

---

## Why Aegisora?

AI agents can do more than generate text. They can call tools, access services, execute workflows, and take actions in external systems.

That makes runtime control a security boundary.

Aegisora provides an open-source runtime layer for evaluating agent actions **before execution**, applying governance policies, assessing risk, enforcing permissions, and producing an explicit decision:

**ALLOW ┬À BLOCK ┬À ESCALATE**

The goal is simple:

> **Let agents act ÔÇö but never let them act without runtime control.**

---

## How It Works

Aegisora is designed to sit directly between an AI agent and the systems it can reach.

```text
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé       AI AGENT       Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
           Ôöé
           Ôöé  Tool / Action Request
           Ôû╝
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé           AEGISORA            Ôöé
Ôöé        Runtime Security       Ôöé
Ôöé                               Ôöé
Ôöé  Identity ┬À Permission        Ôöé
Ôöé  Policy ┬À Context ┬À Risk      Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
               Ôöé
               Ôû╝
        ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
        Ôöé    DECISION   Ôöé
        ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
                Ôöé
        ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
        Ôû╝       Ôû╝        Ôû╝
      ALLOW   BLOCK   ESCALATE
        Ôöé       Ôöé        Ôöé
        ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
                Ôû╝
          EXECUTION
                Ôöé
                Ôû╝
        AUDIT / EVIDENCE
```

For the visual architecture overview, see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

<p align="center">
  <img
    src="assets/architecture.png"
    alt="Aegisora runtime architecture"
    width="900"
  />
</p>

---

## Core Capabilities

- **Runtime interception** ÔÇö evaluate agent actions before execution.
- **Policy enforcement** ÔÇö apply explicit governance rules to agent behavior.
- **Permission control** ÔÇö restrict what an agent can do and which execution surfaces it can reach.
- **Risk assessment** ÔÇö evaluate actions in context before they are executed.
- **Decision enforcement** ÔÇö return `ALLOW`, `BLOCK`, or `ESCALATE`.
- **Zero-trust execution** ÔÇö treat every agent action as requiring an explicit runtime decision.
- **Audit and evidence** ÔÇö record security decisions as auditable runtime evidence.
- **Provider-aware governance** ÔÇö designed to operate across modern AI provider integrations.

---

## Runtime Security Model

Aegisora treats an agent's ability to act as a controlled capability rather than an implicit privilege.

Every request moves through a runtime decision path:

```text
Agent Action
     Ôöé
     Ôû╝
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé Interception Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
       Ôû╝
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé   Security   Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
       Ôû╝
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé    Policy    Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
       Ôû╝
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé Risk Assess. Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
       Ôû╝
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé   Decision   Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöİ
       Ôöé
   ÔöîÔöÇÔöÇÔöÇÔö╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
   Ôû╝   Ôû╝        Ôû╝
 ALLOW BLOCK  ESCALATE
       Ôöé
       Ôû╝
   Execution
       Ôöé
       Ôû╝
 Audit / Evidence
```

This creates a clear enforcement boundary between the agent's reasoning and the external systems it can affect.

---

## Decision Model

Aegisora uses three explicit runtime outcomes:

| Decision | Meaning |
|---|---|
| **ALLOW** | The requested action satisfies the applicable security and governance requirements and may proceed. |
| **BLOCK** | The requested action violates a security or governance requirement and must not execute. |
| **ESCALATE** | The requested action requires additional review, control, or handling before execution. |

The important property is that the decision happens **before the action is executed**.

---

## Risk Classification

Aegisora evaluates agent actions in context rather than treating every tool call as equivalent.

The runtime can use factors such as:

- requested capability,
- selected tool or execution surface,
- applicable policy,
- permissions,
- contextual risk,
- and the consequences of allowing the action.

The result feeds the runtime decision:

```text
LOW / ACCEPTABLE RISK
        Ôöé
        Ôû╝
      ALLOW

HIGH / DISALLOWED RISK
        Ôöé
        Ôû╝
      BLOCK

REQUIRES ADDITIONAL CONTROL
        Ôöé
        Ôû╝
    ESCALATE
```

For the detailed implementation and security model, see [`SECURITY.md`](./SECURITY.md).

---

## Governance Policies

Policies define what an agent is allowed to do at runtime.

A policy can be used to express governance requirements around:

- permitted capabilities,
- restricted actions,
- execution boundaries,
- risk thresholds,
- and escalation conditions.

The intent is to keep governance **explicit, reviewable, and enforceable at runtime** instead of relying only on prompts or application-level conventions.

---

## Audit & Evidence

Runtime decisions should be observable and explainable.

Aegisora records security decisions as audit/evidence data so teams can understand:

```text
WHO
  Ôåô
requested WHAT
  Ôåô
using WHICH capability
  Ôåô
under WHICH policy
  Ôåô
with WHICH risk assessment
  Ôåô
resulting in WHICH decision
```

This provides a traceable security boundary for agent activity.

---

## Supported Providers

Aegisora is designed to work with modern AI agent stacks and provider integrations.

Current provider integrations include:

- OpenAI
- Anthropic
- Gemini

The runtime model is intended to remain provider-agnostic: the security and governance decision should be enforced at the runtime boundary rather than being tied to a single model provider.

---

## Quick Start

Clone the repository and install the dependencies:

```bash
git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
pnpm install
```

Start the development environment:

```bash
pnpm dev
```

Then open the local development URL reported by Next.js.

For the live project, see the [Live Demo](https://aegisora-ai.vercel.app).

---

## Project Structure

At a high level, Aegisora is organized around a runtime enforcement path:

```text
Agent
  Ôöé
  Ôû╝
Runtime Gateway
  Ôöé
  Ôö£ÔöÇÔöÇ Security
  Ôöé
  Ôö£ÔöÇÔöÇ Policy
  Ôöé
  Ôö£ÔöÇÔöÇ Permission
  Ôöé
  Ôö£ÔöÇÔöÇ Risk Assessment
  Ôöé
  ÔööÔöÇÔöÇ Decision
        Ôöé
        Ôö£ÔöÇÔöÇ ALLOW
        Ôö£ÔöÇÔöÇ BLOCK
        ÔööÔöÇÔöÇ ESCALATE
              Ôöé
              Ôû╝
          Execution
              Ôöé
              Ôû╝
        Audit / Evidence
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the detailed architecture.

---

## Examples

### Allow a permitted action

```text
Agent
  Ôöé
  ÔööÔöÇÔöÇ Request tool execution
            Ôöé
            Ôû╝
        Aegisora
            Ôöé
            Ôö£ÔöÇÔöÇ policy: permitted
            Ôö£ÔöÇÔöÇ permission: valid
            ÔööÔöÇÔöÇ risk: acceptable
                    Ôöé
                    Ôû╝
                  ALLOW
                    Ôöé
                    Ôû╝
                Execute
```

### Block a disallowed action

```text
Agent
  Ôöé
  ÔööÔöÇÔöÇ Request tool execution
            Ôöé
            Ôû╝
        Aegisora
            Ôöé
            Ôö£ÔöÇÔöÇ policy: denied
            ÔööÔöÇÔöÇ risk: unacceptable
                    Ôöé
                    Ôû╝
                  BLOCK
```

### Escalate an ambiguous action

```text
Agent
  Ôöé
  ÔööÔöÇÔöÇ Request tool execution
            Ôöé
            Ôû╝
        Aegisora
            Ôöé
            Ôö£ÔöÇÔöÇ policy: requires review
            ÔööÔöÇÔöÇ risk: unresolved
                    Ôöé
                    Ôû╝
                ESCALATE
```

---

## Security

Security is a first-class part of the project.

For the detailed security model, threat considerations, and security guidance, see [`SECURITY.md`](./SECURITY.md).

Please do not disclose security-sensitive information in public issues. For responsible disclosure, follow the project's security guidance.

---

## Architecture

The core architectural principle is:

> **Agent ÔåÆ Runtime Gateway ÔåÆ Security ÔåÆ Policy ÔåÆ Decision ÔåÆ Execution**

Aegisora is designed to enforce governance before an agent action crosses into the systems it can affect.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full architecture documentation.

---

## Roadmap

Aegisora is being developed as an open-source runtime security and governance layer for autonomous AI agents.

The project roadmap focuses on strengthening:

- runtime policy enforcement,
- permission and capability controls,
- contextual risk assessment,
- auditability and evidence,
- provider and tool integrations,
- and production-grade governance.

See the repository's [Issues](https://github.com/aegisora-ai/aegisora.ai/issues) and [Releases](https://github.com/aegisora-ai/aegisora.ai/releases) for the current project status.

---

## Contributing

Contributions are welcome.

Before opening a pull request:

1. Review the existing architecture and security model.
2. Keep runtime enforcement behavior explicit and testable.
3. Add or update tests for security-sensitive changes.
4. Keep documentation aligned with the implementation.
5. Explain the motivation and impact of non-trivial changes.

For project discussion and community collaboration, join the [Aegisora Discord](https://discord.gg/8CM3PpQRT5).

---

## Community

- **GitHub:** https://github.com/aegisora-ai/aegisora.ai
- **Live Demo:** https://aegisora-ai.vercel.app
- **Discord:** https://discord.gg/8CM3PpQRT5
- **Product Hunt:** https://www.producthunt.com/posts/aegisora

---

## License

Aegisora is released under the [MIT License](./LICENSE).

---

<div align="center">

  <strong>Aegisora</strong>

  <br />

  Zero-Trust Security for AI Agents.

  <br /><br />

  <a href="https://github.com/aegisora-ai/aegisora.ai">
    GitHub
  </a>
  ┬À
  <a href="https://aegisora-ai.vercel.app">
    Live Demo
  </a>
  ┬À
  <a href="https://discord.gg/8CM3PpQRT5">
    Discord
  </a>

</div>