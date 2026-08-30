import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { EnforcementGate } from "../src/enforcement/enforcement-gate";

async function main() {
  console.log("");
  console.log("==================================================");
  console.log(" TRACE 95 - GOVERNANCE BOUNDARY CONTRACT");
  console.log("==================================================");

  const context = new RuntimeContext();

  const agentId = "trace95-agent";

  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });

  const gate = new EnforcementGate(context);

  console.log("");
  console.log("=== 95A - ALLOW CONTRACT ===");

  const allowed = await gate.enforce({
    agentId,
    resourceType: "tool",
    tool: "echo",
    action: "tool.execute",
    input: {
      operation: "governed",
    },
    metadata: {
      trace: "95A",
      provider: "attacker-controlled-provider",
      model: "attacker-controlled-model",
    },
  });

  assert.equal(allowed.decision, "ALLOW");
  assert.equal(allowed.enforcementStatus, "not_executed");
  assert.equal(allowed.executionOutcome, "not_attempted");

  for (const value of [
    allowed.traceId,
    allowed.decisionId,
    allowed.executionId,
    allowed.evidenceId,
  ]) {
    assert.match(value, /^[0-9a-f-]{36}$/i);
  }

  console.log("PASS: ALLOW carries canonical correlation contract.");

  console.log("");
  console.log("=== 95B - UNKNOWN IDENTITY FAIL-CLOSED ===");

  const blocked = await gate.enforce({
    agentId: "trace95-forged-agent",
    resourceType: "tool",
    tool: "echo",
    action: "tool.execute",
    input: {
      operation: "forged",
    },
    metadata: {
      trace: "95B",
    },
  });

  assert.equal(blocked.decision, "BLOCK");
  assert.equal(blocked.permission, "deny");
  assert.equal(blocked.enforcementStatus, "prevented");
  assert.equal(blocked.executionOutcome, "not_attempted");

  for (const value of [
    blocked.traceId,
    blocked.decisionId,
    blocked.executionId,
    blocked.evidenceId,
  ]) {
    assert.match(value, /^[0-9a-f-]{36}$/i);
  }

  console.log("PASS: forged identity fails closed before execution.");

  console.log("");
  console.log("=== 95C - AUDIT CORRELATION ===");

  const decisions = context.decisionStore.getAll();

  assert.equal(decisions.length, 2);

  const allowRecord = decisions.find(
    (record) => record.decision === "allow",
  );

  const blockRecord = decisions.find(
    (record) => record.decision === "block",
  );

  assert.ok(allowRecord);
  assert.ok(blockRecord);

  assert.equal(allowRecord?.traceId, allowed.traceId);
  assert.equal(allowRecord?.decisionId, allowed.decisionId);
  assert.equal(allowRecord?.executionId, allowed.executionId);
  assert.equal(allowRecord?.evidenceId, allowed.evidenceId);

  assert.equal(blockRecord?.traceId, blocked.traceId);
  assert.equal(blockRecord?.decisionId, blocked.decisionId);
  assert.equal(blockRecord?.executionId, blocked.executionId);
  assert.equal(blockRecord?.evidenceId, blocked.evidenceId);

  console.log("PASS: audit records preserve canonical correlation.");

  console.log("");
  console.log("=== 95D - FINAL GOVERNANCE INVARIANT ===");

  assert.notEqual(allowed.traceId, blocked.traceId);
  assert.notEqual(allowed.decisionId, blocked.decisionId);

  console.log("PASS: each governance decision has an independent identity.");

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 95 COMPLETE");
  console.log("==================================================");
  console.log("PASSED: trace-95-governance-boundary-contract.ts");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});