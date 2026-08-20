# Aegisora Plugin System

## Overview

Aegisora plugins extend the runtime without bypassing its governance,
security, identity, and enforcement boundaries.

Plugins are loaded and registered through the canonical plugin layer.
A plugin does not receive unrestricted direct access to runtime execution
surfaces.

## Plugin Lifecycle

The plugin layer exposes the following lifecycle concepts:

- registration
- unregistration
- loading
- unloading

Plugin lifecycle operations are separate from execution authorization.

## Governance Boundary

Plugin-related behavior must remain compatible with the Aegisora
governance model:

1. identity is resolved from the canonical runtime identity authority
2. capabilities are evaluated through the runtime security boundary
3. execution must not bypass canonical runtime enforcement
4. unsupported capabilities fail closed
5. security-relevant decisions remain observable

## Public Surface

The package exposes:

- `AegisoraPlugin`
- `PluginRegistry`
- `PluginLoader`
- plugin decision and analysis types

The public package entrypoint is:

`packages/plugins/src/index.ts`

## Security Invariant

A plugin may extend Aegisora, but it must not create an alternate
execution path around the canonical enforcement boundary.

The runtime remains authoritative for:

- identity
- capability authorization
- provider execution
- tool execution
- audit evidence

## Release Validation

Plugin governance is covered by the runtime regression suite, including:

`packages/runtime/test/trace-35-plugin-governance.ts`
