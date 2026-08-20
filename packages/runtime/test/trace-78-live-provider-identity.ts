import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { EnforcementGate } from "../src/enforcement/enforcement-gate";

async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 78 - LIVE PROVIDER CAPABILITY IDENTITY");
  console.log("==================================================");

  const context = new RuntimeContext();

  const agentId = "trace78-agent";

  /*
   * Register a real runtime identity.
   */
  context.agentRegistry.register({
    id: agentId,
    name: "trace78-agent",
  });

  const enforcement =
    new EnforcementGate(context);

  console.log("");
  console.log("=== 78A - PROVIDER CAPABILITY ===");

  const request = {
    agentId,

    resourceType:
      "provider" as const,

    tool:
      "provider:openai",

    action:
      "provider.generate",

    input: {
      model: "trace78-model",
      prompt: "TRACE 78 provider identity probe",
    },

    metadata: {
      trace: "78",
      provider: "openai",
    },
  };

  console.log(
    "resourceType:",
    request.resourceType
  );

  console.log(
    "tool:",
    request.tool
  );

  console.log(
    "action:",
    request.action
  );

  console.log(
    "provider:",
    request.metadata.provider
  );

  console.log("");
  console.log("=== 78B - ENFORCEMENT ===");

  const result =
    await enforcement.enforce(request);

  console.log(
    JSON.stringify(
      result,
      null,
      2
    )
  );

  assert.equal(
    result.permission,
    "allow",
    "Provider capability permission must be allowed"
  );

  assert.equal(
    result.decision,
    "ALLOW",
    "Provider capability must reach ALLOW"
  );

  console.log("");
  console.log(
    "PASS: provider:openai -> provider.generate -> ALLOW"
  );

  console.log("");
  console.log("=== 78C - DECISION TRACE ===");

  const records =
    context.decisionStore.getAll();

  console.log(
    JSON.stringify(
      records,
      null,
      2
    )
  );

  assert.equal(
    records.length,
    1,
    "Exactly one decision trace expected"
  );

  assert.equal(
    records[0].agentId,
    agentId
  );

  assert.equal(
    records[0].action,
    "provider.generate"
  );

  assert.equal(
    records[0].decision,
    "allow"
  );

  assert.equal(
    records[0].metadata.resourceType,
    "provider"
  );

  assert.equal(
    records[0].metadata.tool,
    "provider:openai"
  );

  console.log("");
  console.log(
    "PASS: canonical provider identity persisted"
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 78 COMPLETE");
  console.log("==================================================");
}

main().catch((error) => {

  console.error("");
  console.error("TRACE 78 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
