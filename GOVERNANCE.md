# Aegisora Governance

Aegisora is an open-source project built in public by contributors, maintainers, security researchers, and the wider AI engineering community.

Our goal is to build a trustworthy runtime security and governance layer for autonomous AI systems while maintaining a high standard of security, reliability, transparency, and technical quality.

> **Open contribution. Clear responsibility. Secure decisions.**

---

## Governance Model

Aegisora currently follows a **maintainer-led, community-driven governance model**.

The community is encouraged to participate in technical discussions, proposals, security research, documentation, testing, and implementation.

Maintainers are responsible for protecting the project's:

* Security
* Technical integrity
* Architectural coherence
* Release quality
* Long-term maintainability

As the project grows, governance may evolve to give the broader community greater formal decision-making responsibility.

---

## Core Governance Principles

Project decisions should prioritize:

1. **Security First**
2. **Long-Term Maintainability**
3. **Technical Merit**
4. **Community Value**
5. **Developer Experience**
6. **Simplicity**
7. **Backward Compatibility**
8. **Transparency**

Feature popularity alone is not sufficient justification for a change.

Security and architectural quality take priority over short-term feature velocity.

---

## Roles

### Contributors

Contributors are community members who participate in the project through activities such as:

* Code
* Documentation
* Testing
* Bug reports
* Feature proposals
* Security research
* Issue triage
* Code review
* Design
* Developer tooling

Contributors do not need maintainer status to influence the project.

High-quality contributions and constructive participation are valued regardless of role.

---

### Maintainers

Maintainers are trusted contributors responsible for the health of the project.

Maintainer responsibilities include:

* Reviewing pull requests
* Reviewing architectural changes
* Maintaining project quality
* Managing releases
* Reviewing RFCs
* Helping contributors
* Protecting security standards
* Maintaining documentation
* Resolving technical disputes
* Keeping the project aligned with its long-term direction

Maintainers should act in the interests of the project and its wider community rather than personal preference.

---

### Core Maintainers

Aegisora may designate a smaller group of core maintainers for decisions requiring elevated trust or project-wide coordination.

Core maintainers may be responsible for:

* Major architectural decisions
* Security-sensitive changes
* Release coordination
* Governance changes
* Project-wide technical direction
* Critical incident response

Core maintainer decisions should remain transparent wherever security or confidentiality does not require otherwise.

---

## How Decisions Are Made

### Small Changes

Routine changes normally follow the standard contribution workflow:

```text
Issue / Proposal
      ↓
Implementation
      ↓
Pull Request
      ↓
Review
      ↓
CI / Tests
      ↓
Merge
```

Examples include:

* Documentation fixes
* Bug fixes
* Tests
* Small UI improvements
* Non-breaking developer-experience improvements

---

### Significant Changes

Changes that affect architecture, security, public APIs, or project direction should receive broader review.

Typical process:

```text
Proposal
   ↓
Technical Discussion
   ↓
RFC (when appropriate)
   ↓
Community Feedback
   ↓
Maintainer / Core Maintainer Review
   ↓
Implementation
   ↓
Testing & Validation
   ↓
Merge
```

Not every significant change requires a formal RFC, but major changes should be discussed before substantial implementation effort begins whenever practical.

---

## RFC Process

An RFC is appropriate when a proposal could materially affect the future direction of Aegisora.

Examples include:

* New runtime architecture
* Major policy-engine changes
* New extension or plugin models
* Public API redesign
* Breaking changes
* Major data-model changes
* Security architecture changes
* New execution or enforcement models

RFCs should explain:

* Problem statement
* Motivation
* Proposed solution
* Alternatives considered
* Security implications
* Compatibility implications
* Migration strategy
* Testing strategy
* Open questions

RFC discussions should happen publicly whenever possible.

If a formal RFC directory is introduced, RFC documents should be organized under:

```text
docs/rfc/
```

Until then, proposals may be discussed through GitHub Issues and Discussions.

---

## Security Decisions

Security-sensitive changes receive additional scrutiny.

Examples include:

* Authentication
* Authorization
* Policy enforcement
* Tool execution
* Secrets handling
* Data access
* Runtime enforcement
* Sandboxing
* Prompt-injection defenses
* Security boundaries

Security vulnerabilities should **not** be disclosed through public governance discussions.

Follow [`SECURITY.md`](./SECURITY.md) for vulnerability reporting.

Security considerations may justify confidential review when public discussion would increase exploitation risk.

---

## Breaking Changes

Breaking changes should be avoided unless the technical benefit clearly justifies the migration cost.

A breaking change should normally include:

* Technical justification
* Impact assessment
* Migration path
* Documentation updates
* Tests
* Compatibility considerations
* Community discussion when appropriate

Breaking changes should never be introduced solely for convenience when a safe backward-compatible alternative is practical.

---

## API and Compatibility Stability

Public interfaces should be treated carefully.

Before changing a public API, contributors should consider:

* Existing integrations
* Existing users
* Documentation
* Examples
* Tests
* Migration requirements
* Versioning implications

Where practical, deprecated behavior should receive a migration path before removal.

---

## Code Ownership

The repository contains a `.github/CODEOWNERS` file for ownership and review configuration.

Critical components may require review from designated maintainers.

Code ownership should be used to protect sensitive areas such as:

* Security infrastructure
* Runtime enforcement
* Authentication and authorization
* Data access
* CI and release infrastructure
* Public APIs

Ownership rules may evolve as the project and maintainer community grow.

---

## Release Decisions

Maintainers are responsible for ensuring that releases meet the project's quality expectations.

Release decisions should consider:

* Test status
* Security impact
* Breaking changes
* Documentation
* Migration requirements
* Known regressions
* Dependency changes

Security-critical releases may be prioritized independently of normal feature cadence.

---

## Maintainer Selection

Maintainer status should be earned through sustained contribution and demonstrated responsibility.

Factors may include:

* Consistent high-quality contributions
* Strong understanding of the architecture
* Security awareness
* Review quality
* Community participation
* Reliability
* Constructive communication
* Long-term commitment to the project

Maintainer invitations are made by existing maintainers based on demonstrated trust and project needs.

There is no requirement to be employed by Aegisora to become a trusted open-source contributor or maintainer.

---

## Maintainer Responsibilities

Maintainers are expected to:

* Review contributions fairly
* Explain important technical decisions
* Protect contributors from unnecessary process
* Avoid conflicts of interest
* Follow the security disclosure process
* Keep project discussions constructive
* Document important architectural decisions
* Prioritize the long-term health of the project

Maintainer privileges are responsibilities, not status symbols.

---

## Disagreement and Conflict Resolution

Technical disagreement is expected in an open-source project.

The preferred escalation path is:

```text
Contributor Discussion
        ↓
Issue / Pull Request Discussion
        ↓
Maintainer Review
        ↓
Core Maintainer Decision
```

Disagreements should focus on technical evidence, project goals, security, and user impact.

Personal attacks, harassment, or bad-faith behavior are not acceptable.

Community conduct is governed by [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

---

## Transparency

Aegisora prefers public discussion whenever possible.

The following should generally remain publicly visible:

* Issues
* Feature discussions
* RFCs
* Architecture decisions
* Pull request discussions
* Roadmap discussions
* Documentation changes

Exceptions may be required for:

* Security vulnerabilities
* Credentials or secrets
* Private user information
* Legal or compliance matters
* Sensitive operational incidents

---

## Governance Changes

Changes to this governance document should themselves be proposed openly.

Significant governance changes should include:

* The reason for the change
* The proposed new model
* Community discussion
* Maintainer review
* Documentation updates

Governance should evolve as Aegisora grows rather than becoming a process barrier to contribution.

---

## Project Values

The governance model exists to protect a few simple principles:

> **Security over convenience.**
>
> **Technical evidence over personal preference.**
>
> **Long-term sustainability over short-term growth.**
>
> **Open collaboration over closed decision-making whenever practical.**

---

## Related Documentation

* [`README.md`](./README.md)
* [`ARCHITECTURE.md`](./ARCHITECTURE.md)
* [`CONTRIBUTING.md`](./CONTRIBUTING.md)
* [`SECURITY.md`](./SECURITY.md)
* [`ROADMAP.md`](./ROADMAP.md)
* [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)

---

## Thank You

Aegisora is built by its community.

Every contributor, maintainer, researcher, reviewer, and user helps shape the project's future.

> **Build openly. Govern responsibly. Secure the runtime.**
