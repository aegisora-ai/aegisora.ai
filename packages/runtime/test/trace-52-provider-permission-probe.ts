import assert from "node:assert/strict";

import { PermissionEngine } from "../src/permissions";

console.log("");
console.log("==================================================");
console.log(" TRACE 52 - PROVIDER PERMISSION PROBE");
console.log("==================================================");

const permissions = new PermissionEngine();

console.log("");
console.log("=== 52A - TOOL: echo ===");

const echo = permissions.check({
  agentId: "trace52-agent",
    resourceType: "tool",
    tool: "echo",
  action: "tool.execute",
});

console.log(JSON.stringify(echo, null, 2));

assert.equal(echo.action, "allow");

console.log("PASS: echo allowed");

console.log("");
console.log("=== 52B - PROVIDER: openai ===");

const openai = permissions.check({
  agentId: "trace52-agent",
    resourceType: "provider",
    tool: "provider:openai",
    action: "provider.generate",
});

console.log(JSON.stringify(openai, null, 2));

assert.equal(
  openai.action,
  "allow"
);

console.log(
  "PASS: openai provider allowed"
);

console.log("");
console.log("=== 52C - PROVIDER: anthropic ===");

const anthropic = permissions.check({
  agentId: "trace52-agent",
    resourceType: "provider",
    tool: "provider:anthropic",
    action: "provider.generate",
});

console.log(JSON.stringify(anthropic, null, 2));

assert.equal(
  anthropic.action,
  "allow"
);

console.log(
  "PASS: anthropic provider allowed"
);

console.log("");
console.log("=== 52D - UNKNOWN PROVIDER ===");

const unknown = permissions.check({
  agentId: "trace52-agent",
    resourceType: "provider",
    tool: "provider:unknown",
    action: "provider.generate",
});

console.log(JSON.stringify(unknown, null, 2));

assert.equal(
  unknown.action,
  "deny"
);

console.log(
  "PASS: unknown provider remains denied"
);

console.log("");
console.log("==================================================");
console.log(" TRACE 52 COMPLETE");
console.log("==================================================");
