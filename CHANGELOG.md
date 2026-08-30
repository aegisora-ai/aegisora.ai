# Changelog

All notable changes to Aegisora are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

---

## [1.6.0] - 2026-08-30

### Security

* Established `ToolRegistry` as the single canonical runtime tool authority.
* Introduced scoped, single-use authorization receipts for governed tool execution.
* Closed direct unauthorized `ToolRegistry` execution paths.
* Strengthened provider governance ordering before provider and model resolution.
* Removed legacy runtime authority implementations.

### Runtime

* Separated governance authority from `AgentExecutor`.
* Hardened execution around canonical authorization capabilities.
* Strengthened provider and model identity integrity across execution paths.
* Preserved canonical decision and audit correlation.

### Removed

* `agent/agent.ts`
* `agent/tool.ts`
* `agent/executor.ts`

### Validation

* Runtime build passed.
* Runtime typecheck passed.
* 75/75 runtime tests passed.
* Provider/model identity integrity traces passed.
* Cross-provider resolution authority traces passed.
* Protected agent execution boundary passed.
* Direct tool bypass resistance passed.

---
## [0.1.3] - 2026-08-26

### Security

* Hardened registered-agent identity enforcement.
* Closed direct `ToolRegistry` execution bypasses.
* Closed direct `ProviderRouter` and provider-generation bypasses.
* Strengthened enforcement boundaries for unsupported execution surfaces.
* Continued hardening of runtime authorization and governance paths.

### Runtime

* Unified public governance and provider API exports.
* Added canonical decision and event correlation identifiers.
* Established canonical enforcement-owned runtime event emission.
* Strengthened runtime audit evidence and decision tracing.
* Preserved fail-closed behavior for unsupported execution surfaces.

### Testing

* Expanded runtime regression coverage around governance and enforcement boundaries.
* Continued validation of direct execution bypass scenarios.
* Improved release-readiness verification across workspace packages.

### Release

* Continued improving monorepo release validation.
* Continued validating public package exports and installation behavior.

---

## [0.1.2] - 2026-08-21

### Added

* Published all 9 Aegisora packages to npm.
* Added release-readiness validation for the monorepo.
* Added verification of public SDK and runtime imports.

### Changed

* Replaced public `workspace:*` dependency leakage with external-safe release dependencies.
* Improved release package dependency resolution for external consumers.

### Security

* Verified the runtime enforcement boundaries for:

  * `ALLOW`
  * `BLOCK`
  * `ESCALATE`
  * Audit events
* Verified that public SDK and runtime imports resolve correctly from released packages.

### Validation

* Verified clean external npm installation.
* Verified workspace package builds.
* Verified SDK and runtime public imports.
* Verified runtime governance and audit enforcement boundaries.

---

## Release Notes

### 0.1.2 Ã¢â‚¬â€ Runtime & Release Hardening

The `0.1.2` release focused on preparing Aegisora for external consumption and strengthening the runtime governance boundary.

Key areas included:

* npm package publishing
* External dependency correctness
* Public SDK and runtime imports
* Runtime decision enforcement
* Audit and event integrity
* Release validation

---

## Changelog Guidelines

Future releases should document meaningful changes under the following categories where applicable:

### Added

New capabilities, APIs, integrations, or developer tooling.

### Changed

Changes to existing behavior, architecture, configuration, or interfaces.

### Fixed

Bug fixes and regressions.

### Security

Security fixes, enforcement hardening, authorization changes, vulnerability remediation, and security-related behavior changes.

### Deprecated

Features or APIs that are still available but scheduled for removal.

### Removed

Features, APIs, dependencies, or behaviors that have been removed.

### Performance

Meaningful performance improvements or regressions.

### Testing

Important changes to test coverage, benchmarks, validation, or security testing.

### Documentation

Significant documentation improvements that affect users or contributors.

### Release

Release infrastructure, packaging, publishing, or distribution changes.

---

## Versioning Policy

Aegisora follows Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

### MAJOR

Introduces incompatible API or behavioral changes.

### MINOR

Adds functionality in a backwards-compatible manner.

### PATCH

Introduces backwards-compatible fixes and improvements.

Security fixes may be released independently when necessary.

---

## Unreleased Changes

The `Unreleased` section contains changes that have landed in the project but have not yet been included in a published release.

Before a release, maintainers may reorganize these entries into the appropriate version section.

---

## Links

* [Aegisora Repository](https://github.com/aegisora-ai/aegisora)
* [Releases](https://github.com/aegisora-ai/aegisora/releases)
* [Issues](https://github.com/aegisora-ai/aegisora/issues)
* [Contributing](./CONTRIBUTING.md)
* [Security](./docs/security/validation.md)
