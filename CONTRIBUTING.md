# Contributing to Aegisora

First of all, thank you for considering contributing to Aegisora.

Our goal is not simply to build another AI security tool.

Our mission is to build the open runtime governance layer for autonomous AI systems.

Every contribution—whether it's code, documentation, design, testing, security research, or discussion—helps move that mission forward.

---

# Before You Start

Please read the following documents before opening a Pull Request.

- README.md
- SECURITY.md
- GOVERNANCE.md
- ROADMAP.md

---

# Development Philosophy

Every contribution should improve at least one of these areas:

- Security
- Reliability
- Developer Experience
- Performance
- Documentation
- Observability

If a contribution doesn't improve one of these pillars, it probably doesn't belong in Aegisora.

---

# Local Development

Clone the repository

```bash
git clone https://github.com/ozereray/aegisora.ai.git
cd aegisora.ai
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

---

# Branch Strategy

Always create feature branches.

```
feature/...
fix/...
docs/...
refactor/...
security/...
```

Never work directly on main.

---

# Commit Convention

We follow Conventional Commits.

Examples

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

Example

```
feat(policy): add risk scoring engine
```

---

# Pull Requests

A Pull Request should:

- solve one problem
- remain focused
- include documentation
- include tests whenever possible
- not introduce breaking changes without discussion

---

# Coding Standards

We value:

- readable code
- predictable APIs
- explicit naming
- modular architecture
- security-first design

Avoid unnecessary abstraction.

Prefer clarity over cleverness.

---

# Architecture Principles

Every new feature should respect the following principles.

- Zero Trust by Default
- Policy Before Execution
- Human in the Loop
- Observable by Design
- Plugin First
- Backwards Compatibility

---

# Reporting Bugs

Please include:

- environment
- reproduction steps
- expected behavior
- actual behavior
- screenshots if applicable

---

# Feature Requests

Before opening a feature request:

- check existing issues
- explain the problem
- explain why the solution belongs in Aegisora
- describe possible alternatives

---

# Security Issues

Please do not disclose security vulnerabilities publicly.

See SECURITY.md for responsible disclosure instructions.

---

# Code Review

Every Pull Request is reviewed for:

- architecture
- security
- maintainability
- developer experience
- documentation

Passing CI does not automatically guarantee approval.

---

# Community

Be respectful.

Help other contributors.

Review code.

Improve documentation.

Share ideas.

Open source succeeds through collaboration.

---

# Thank You

Thank you for helping build the future of secure autonomous AI systems.
