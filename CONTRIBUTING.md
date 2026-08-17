# Contributing to Aegisora 🛡️

First of all, thank you for considering contributing to Aegisora.

Our goal is not simply to build another AI security tool. Our mission is to build the open runtime governance layer for autonomous AI systems. Every contribution—whether it's code, documentation, design, testing, security research, or discussion—helps move that mission forward.

## 🌟 The Aegisora Ecosystem & Teams

We recognize and reward our contributors. Consistent and high-quality contributions are the path to joining our official GitHub organization teams, which you can proudly display on your CV and LinkedIn.

- **Community Contributors:** The entry point. Submit bug fixes, improve docs, or build basic integrations.
- **Security Researchers:** For those who responsibly disclose vulnerabilities, improve our zero-trust architecture, and harden the proxy.
- **Core Maintainers:** The elite architectural board. Hand-picked from our most dedicated and technically excellent contributors.

---

## Before You Start

Please read the following documents before opening a Pull Request.

- README.md
- SECURITY.md
- GOVERNANCE.md
- ROADMAP.md

---

## Development Philosophy

Every contribution should improve at least one of these areas:

- Security
- Reliability
- Developer Experience
- Performance
- Documentation
- Observability

If a contribution doesn't improve one of these pillars, it probably doesn't belong in Aegisora.

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

### Branch Strategy

Always create feature branches. Never work directly on `main`.

```
feature/...
fix/...
docs/...
refactor/...
security/...
```

### Commit Convention

We follow Conventional Commits.

```
feat:
fix:
docs:
refactor:
test:
ci:
perf:
security:
```

Example: `feat(policy): add risk scoring engine`

---

## Pull Requests

A Pull Request should:

- solve one problem
- remain focused
- include documentation
- include tests whenever possible
- not introduce breaking changes without discussion

---

## Coding Standards

We value:

- readable code
- predictable APIs
- explicit naming
- modular architecture
- security-first design

Avoid unnecessary abstraction. Prefer clarity over cleverness.

---

## Architecture Principles

Every new feature should respect the following principles:

- Zero Trust by Default
- Policy Before Execution
- Human in the Loop
- Observable by Design
- Plugin First
- Backwards Compatibility

---

## Reporting Bugs

Please include:

- environment
- reproduction steps
- expected behavior
- actual behavior
- screenshots if applicable

---

## Feature Requests

Before opening a feature request:

- check existing issues
- explain the problem
- explain why the solution belongs in Aegisora
- describe possible alternatives

---

## Security Issues

Please do not disclose security vulnerabilities publicly. See `SECURITY.md` for responsible disclosure instructions.

---

## Code Review

Every Pull Request is reviewed for:

- architecture
- security
- maintainability
- developer experience
- documentation

Passing CI does not automatically guarantee approval. Due to our strict enterprise rules, all PRs require at least one approving review from a Core Maintainer before merging.

---

## Community

Be respectful. Help other contributors. Review code. Improve documentation. Share ideas. Open source succeeds through collaboration.

---

## Thank You

Thank you for helping build the future of secure autonomous AI systems.
