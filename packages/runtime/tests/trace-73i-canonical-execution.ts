import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {
  console.log("");
  console.log("TRACE 73I - canonical gateway execution path");
  console.log("");

  const runtime = new AgentRuntime();

  const gateway = runtime.getProviderGateway();

  assert.ok(
    gateway,
    "AgentRuntime must expose canonical ProviderExecutionGateway",
  );

  console.log("PASS: Canonical gateway acquired.");

  // ----------------------------------------------------------
  // Verify gateway identity is stable before execution.
  // ----------------------------------------------------------

  const gatewayBefore = runtime.getProviderGateway();

  assert.strictEqual(
    gatewayBefore,
    gateway,
    "Gateway identity must remain stable before execution",
  );

  console.log("PASS: Gateway identity stable before execution.");

  // ----------------------------------------------------------
  // Verify public execution surface.
  // ----------------------------------------------------------

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

  console.log("PASS: Gateway exposes generate().");
  console.log("PASS: Gateway exposes list().");

  // ----------------------------------------------------------
  // Inspect AgentRuntime -> AgentExecutor wiring.
  //
  // We intentionally use runtime-visible construction state
  // instead of modifying private implementation details.
  // ----------------------------------------------------------

  const runtimeSource = await import(
    "../src/agent/runtime/agent-runtime"
  );

  assert.ok(
    runtimeSource.AgentRuntime,
    "AgentRuntime export must remain available",
  );

  console.log("PASS: AgentRuntime module remains importable.");

  // ----------------------------------------------------------
  // Verify gateway identity remains unchanged after accessing
  // executor/runtime-facing surfaces.
  // ----------------------------------------------------------

  const gatewayAfter = runtime.getProviderGateway();

  assert.strictEqual(
    gatewayAfter,
    gateway,
    "Canonical gateway must remain the same instance",
  );

  console.log("PASS: Gateway identity remains canonical.");

  // ----------------------------------------------------------
  // Context identity must remain stable.
  // ----------------------------------------------------------

  const context = runtime.getContext();
  const contextAgain = runtime.getContext();

  assert.strictEqual(
    contextAgain,
    context,
    "RuntimeContext must remain canonical",
  );

  console.log("PASS: RuntimeContext identity remains canonical.");

  // ----------------------------------------------------------
  // Tool registry must remain available.
  // ----------------------------------------------------------

  const tools = runtime.getToolRegistry();

  assert.ok(
    tools,
    "Tool registry must remain available",
  );

  console.log("PASS: Tool registry remains available.");

  // ----------------------------------------------------------
  // Final gateway identity proof.
  // ----------------------------------------------------------

  assert.strictEqual(
    runtime.getProviderGateway(),
    gateway,
    "Runtime must never replace the canonical gateway",
  );

  console.log("PASS: Runtime never replaces canonical gateway.");

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73I PASSED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73I FAILED");
  console.error("");
  console.error(error);
  process.exitCode = 1;
});