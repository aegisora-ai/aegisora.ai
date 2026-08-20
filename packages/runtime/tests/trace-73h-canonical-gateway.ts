import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {
  console.log("");
  console.log("TRACE 73H - runtime gateway identity test");
  console.log("");

  const runtime = new AgentRuntime();

  // ----------------------------------------------------------
  // CANONICAL GATEWAY
  // ----------------------------------------------------------

  const gateway = runtime.getProviderGateway();

  assert.ok(
    gateway,
    "AgentRuntime must expose its canonical ProviderExecutionGateway",
  );

  console.log("PASS: AgentRuntime exposes canonical gateway.");

  // ----------------------------------------------------------
  // CANONICAL CONTEXT
  // ----------------------------------------------------------

  const context = runtime.getContext();

  assert.ok(
    context,
    "AgentRuntime must expose its canonical RuntimeContext",
  );

  console.log("PASS: AgentRuntime exposes canonical context.");

  // ----------------------------------------------------------
  // GATEWAY IDENTITY
  // ----------------------------------------------------------

  const gatewayAgain = runtime.getProviderGateway();

  assert.strictEqual(
    gatewayAgain,
    gateway,
    "getProviderGateway() must return the same gateway instance",
  );

  console.log(
    "PASS: getProviderGateway() returns stable singleton instance.",
  );

  // ----------------------------------------------------------
  // CONTEXT IDENTITY
  // ----------------------------------------------------------

  const contextAgain = runtime.getContext();

  assert.strictEqual(
    contextAgain,
    context,
    "getContext() must return the same context instance",
  );

  console.log(
    "PASS: getContext() returns stable canonical context.",
  );

  // ----------------------------------------------------------
  // PUBLIC GATEWAY API
  // ----------------------------------------------------------

  assert.equal(
    typeof gateway,
    "object",
    "Canonical gateway must be an object instance",
  );

  assert.equal(
    typeof gateway.generate,
    "function",
    "Canonical gateway must expose generate()",
  );

  assert.equal(
    typeof gateway.list,
    "function",
    "Canonical gateway must expose list()",
  );

  console.log("PASS: Canonical gateway exposes generate().");
  console.log("PASS: Canonical gateway exposes list().");

  // ----------------------------------------------------------
  // TOOL REGISTRY
  // ----------------------------------------------------------

  const tools = runtime.getToolRegistry();

  assert.ok(
    tools,
    "AgentRuntime tool registry must remain available",
  );

  console.log("PASS: Tool registry remains available.");

  // ----------------------------------------------------------
  // FINAL
  // ----------------------------------------------------------

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73H PASSED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73H FAILED");
  console.error("");
  console.error(error);
  process.exitCode = 1;
});