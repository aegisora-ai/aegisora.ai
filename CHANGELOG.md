## 0.1.2 - 2026-08-21

- Published all 9 Aegisora packages to npm.
- Replaced public workspace:* dependency leakage with external-safe release dependencies.
- Verified clean external npm installation.
- Verified SDK and runtime public imports.
- Verified ALLOW, BLOCK, ESCALATE and audit enforcement boundaries.

# Changelog

All notable changes to Aegisora are documented here.

## Unreleased

### Security
- Hardened registered-agent identity enforcement.
- Closed direct ToolRegistry execution bypasses.
- Closed direct ProviderRouter/provider generation bypasses.
- Added canonical decision/event correlation IDs.
- Established canonical enforcement-owned runtime event emission.

### Runtime
- Unified public governance and provider API exports.
- Preserved fail-closed behavior for unsupported execution surfaces.
- Strengthened runtime audit evidence and decision tracing.

### Release
- Added release-readiness validation for the monorepo.
- Verified workspace package builds.
