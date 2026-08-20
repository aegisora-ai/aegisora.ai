import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {

  console.log("");
  console.log("TRACE 112-R6-D - LIVE SHARED REGISTRY IDENTITY");
  console.log("");

  /*
   * ------------------------------------------------------------
   * 1. CREATE RUNTIME
   * ------------------------------------------------------------
   */

  const runtime = new AgentRuntime();

  console.log("PASS: AgentRuntime created.");

  /*
   * ------------------------------------------------------------
   * 2. GET CANONICAL CONTEXT
   * ------------------------------------------------------------
   */

  const context = runtime.getContext();

  assert.ok(
    context,
    "AgentRuntime MUST expose its RuntimeContext",
  );

  console.log("PASS: RuntimeContext acquired.");

  /*
   * ------------------------------------------------------------
   * 3. PROVE REGISTRY OBJECT IDENTITY
   * ------------------------------------------------------------
   */

  const registryFromRuntime =
    runtime.getAgentRegistry();

  const registryFromContext =
    context.agentRegistry;

  assert.strictEqual(
    registryFromRuntime,
    registryFromContext,
    "AgentRuntime and RuntimeContext MUST expose the SAME AgentRegistry instance",
  );

  console.log(
    "PASS: AgentRuntime.getAgentRegistry() === RuntimeContext.agentRegistry",
  );

  /*
   * ------------------------------------------------------------
   * 4. CREATE AGENT
   * ------------------------------------------------------------
   */

  const agentId =
    "trace-112-r6-d-shared-agent";

  const agent =
    runtime.create(agentId);

  assert.equal(
    agent.id,
    agentId,
    "Created agent identity MUST remain stable",
  );

  console.log(
    `PASS: Agent created with identity ${agentId}`,
  );

  /*
   * ------------------------------------------------------------
   * 5. LOOKUP THROUGH RUNTIME
   * ------------------------------------------------------------
   */

  const viaRuntime =
    runtime.getAgentById(agentId);

  assert.ok(
    viaRuntime,
    "Agent MUST be visible through AgentRuntime",
  );

  console.log(
    "PASS: Agent visible through AgentRuntime",
  );

  /*
   * ------------------------------------------------------------
   * 6. LOOKUP THROUGH CONTEXT REGISTRY
   * ------------------------------------------------------------
   */

  const viaContext =
    context.agentRegistry.getById(agentId);

  assert.ok(
    viaContext,
    "Agent MUST be visible through RuntimeContext AgentRegistry",
  );

  console.log(
    "PASS: Agent visible through RuntimeContext AgentRegistry",
  );

  /*
   * ------------------------------------------------------------
   * 7. PROVE SAME REGISTERED ENTRY
   * ------------------------------------------------------------
   */

  assert.strictEqual(
    viaRuntime,
    viaContext,
    "Runtime and Context lookups MUST return the SAME registry entry",
  );

  console.log(
    "PASS: Runtime and Context return the same registered entry",
  );

  /*
   * ------------------------------------------------------------
   * 8. REMOVE THROUGH CANONICAL REGISTRY
   * ------------------------------------------------------------
   */

  registryFromRuntime.remove(agentId);

  console.log(
    "PASS: Agent removed through canonical registry",
  );

  /*
   * ------------------------------------------------------------
   * 9. PROVE REMOVAL IS SHARED
   * ------------------------------------------------------------
   */

  const afterRuntimeRemoval =
    runtime.getAgentById(agentId);

  assert.equal(
    afterRuntimeRemoval,
    undefined,
    "Removed agent MUST disappear from AgentRuntime lookup",
  );

  const afterContextRemoval =
    context.agentRegistry.getById(agentId);

  assert.equal(
    afterContextRemoval,
    undefined,
    "Removed agent MUST disappear from RuntimeContext registry",
  );

  console.log(
    "PASS: Removal propagated through both registry access paths",
  );

  /*
   * ------------------------------------------------------------
   * FINAL
   * ------------------------------------------------------------
   */

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 112-R6-D PASSED");
  console.log(" SHARED REGISTRY INSTANCE CONFIRMED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {

  console.error("");
  console.error("TRACE 112-R6-D FAILED");
  console.error("");

  if (error instanceof Error) {
    console.error(error.message);
    console.error("");
    console.error(error.stack);
  } else {
    console.error(String(error));
  }

  process.exitCode = 1;
});
