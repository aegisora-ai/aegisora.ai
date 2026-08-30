import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { EnforcementGate } from "../src/enforcement/enforcement-gate";

async function main() {
  console.log("");
  console.log("==================================================");
  console.log(" TRACE 96 - CORRELATION IDENTITY INTEGRITY");
  console.log("==================================================");

  const context = new RuntimeContext();

  const agentId = "trace96-agent";

  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });

  const gate = new EnforcementGate(context);

  console.log("");
  console.log("=== 96A - ATTACKER CORRELATION SPOOF ===");

  const spoofedMetadata = {
    trace: "96A",
    traceId: "attacker-trace-id",
    decisionId: "attacker-decision-id",
    executionId: "attacker-execution-id",
    evidenceId: "attacker-evidence-id",
    correlationId: "attacker-correlation-id",
  };

  const result = await gate.enforce({
    agentId,
    resourceType: "tool",
    tool: "echo",
    action: "tool.execute",
    input: {
      message: "trace96",
    },
    metadata: spoofedMetadata,
  });

  assert.equal(result.decision, "ALLOW");

  for (const value of [
    result.traceId,
    result.decisionId,
    result.executionId,
    result.evidenceId,
  ]) {
    assert.match(value, /^[0-9a-f-]{36}$/i);
  }

  assert.notEqual(result.traceId, spoofedMetadata.traceId);
  assert.notEqual(result.decisionId, spoofedMetadata.decisionId);
  assert.notEqual(result.executionId, spoofedMetadata.executionId);
  assert.notEqual(result.evidenceId, spoofedMetadata.evidenceId);

  console.log(
    "PASS: attacker-controlled correlation identifiers cannot become canonical.",
  );

  console.log("");
  console.log("=== 96B - AUDIT CORRELATION ===");

  const decisions = context.decisionStore.getAll();

  assert.equal(decisions.length, 1);

  const record = decisions[0];

  assert.equal(record.traceId, result.traceId);
  assert.equal(record.decisionId, result.decisionId);
  assert.equal(record.executionId, result.executionId);
  assert.equal(record.evidenceId, result.evidenceId);

  console.log(
    "PASS: audit uses runtime-generated canonical correlation identifiers.",
  );

  console.log("");
  console.log("=== 96C - METADATA INTEGRITY ===");

  assert.equal(
    record.metadata.traceId,
    result.traceId,
  );

  assert.equal(
    record.metadata.decisionId,
    result.decisionId,
  );

  assert.equal(
    record.metadata.executionId,
    result.executionId,
  );

  assert.equal(
    record.metadata.evidenceId,
    result.evidenceId,
  );

  console.log(
    "PASS: audit metadata retains canonical correlation identity.",
  );

  console.log("");
  console.log("=== 96D - FINAL SECURITY INVARIANT ===");

  assert.notEqual(
    result.traceId,
    "attacker-trace-id",
  );

  assert.notEqual(
    result.decisionId,
    "attacker-decision-id",
  );

  assert.notEqual(
    result.executionId,
    "attacker-execution-id",
  );

  assert.notEqual(
    result.evidenceId,
    "attacker-evidence-id",
  );

  assert.equal(
    record.metadata.traceId,
    result.traceId,
  );

  console.log(
    "PASS: REQUEST -> ENFORCEMENT -> AUDIT correlation remains authoritative.",
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 96 COMPLETE");
  console.log("==================================================");
  console.log(
    "PASSED: trace-96-correlation-identity-integrity.ts",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});