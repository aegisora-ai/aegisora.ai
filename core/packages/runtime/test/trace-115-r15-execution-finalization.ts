/// <reference types="node" />
import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { EnforcementGate } from "../src/enforcement";
import { Agent } from "../src/agent/core/agent";

async function main() {
  console.log("");
  console.log("============================================================");
  console.log(" TRACE 115-R15 :: EXECUTION FINALIZATION");
  console.log("============================================================");
  console.log("");

  /*
   * ------------------------------------------------------------
   * 1. RUNTIME CONTEXT / AGENT REGISTRATION
   * ------------------------------------------------------------
   *
   * AgentRegistry.register() mutates the registry.
   * The canonical Agent instance is obtained through getById().
   */

  const context =
    new RuntimeContext();

  context.agentRegistry.register(
    new Agent({
      id: "trace-115-r15-agent",
      name: "trace-115-r15-agent",
    }),
  );

  const agent =
    context.agentRegistry.getById(
      "trace-115-r15-agent",
    );

  assert.ok(agent);

  console.log(
    "[PASS] canonical agent registration",
  );

  /*
   * ------------------------------------------------------------
   * 2. GOVERNANCE GATE
   * ------------------------------------------------------------
   */

  const gate =
    new EnforcementGate(
      context,
    );

  /*
   * ------------------------------------------------------------
   * 3. ALLOW -> INITIAL EXECUTION STATE
   * ------------------------------------------------------------
   */

  console.log(
    "[1] ALLOW -> initial not_attempted",
  );

  const allowed =
    await gate.enforce({
      agentId: agent.id,
      resourceType: "provider",
      tool: "provider:openai",
      action: "provider.generate",
      input: {
        model: "test-model",
        prompt: "trace-115-r15 execution finalization",
      },
      metadata: {
        provider: "openai",
        model: "test-model",
      },
    });

  assert.equal(
    allowed.decision,
    "ALLOW",
  );

  assert.ok(
    allowed.traceId,
  );

  assert.ok(
    allowed.decisionId,
  );

  assert.ok(
    allowed.executionId,
  );

  assert.ok(
    allowed.evidenceId,
  );

  assert.equal(
    allowed.executionOutcome,
    "not_attempted",
  );

  const initialTrace =
    context.decisionStore
      .getAll()
      .find(
        (item) =>
          item.decisionId ===
          allowed.decisionId,
      );

  const initialEvidence =
    context.evidenceStore.getById(
      allowed.evidenceId!,
    );

  assert.ok(initialTrace);
  assert.ok(initialEvidence);

  assert.equal(
    initialTrace?.enforcementStatus,
    "not_executed",
  );

  assert.equal(
    initialTrace?.executionOutcome,
    "not_attempted",
  );

  assert.equal(
    initialEvidence?.enforcementStatus,
    "not_executed",
  );

  assert.equal(
    initialEvidence?.executionOutcome,
    "not_attempted",
  );

  console.log(
    "[PASS] ALLOW initial finalization state",
  );

  /*
   * ------------------------------------------------------------
   * 4. SUCCESS FINALIZATION
   * ------------------------------------------------------------
   */

  console.log(
    "[2] FINALIZE -> succeeded",
  );

  const successFinalized =
    context.decisionStore.finalize(
      allowed.decisionId!,
      {
        enforcementStatus: "executed",
        executionOutcome: "succeeded",
        metadata: {
          executionComponent:
            "trace-115-r15",
        },
      },
    );

  assert.equal(
    successFinalized,
    true,
  );

  const successTrace =
    context.decisionStore
      .getAll()
      .find(
        (item) =>
          item.decisionId ===
          allowed.decisionId,
      );

  const successEvidence =
    context.evidenceStore.getById(
      allowed.evidenceId!,
    );

  assert.ok(successTrace);
  assert.ok(successEvidence);

  assert.equal(
    successTrace?.executionOutcome,
    "succeeded",
  );

  assert.equal(
    successTrace?.enforcementStatus,
    "executed",
  );

  assert.equal(
    successEvidence?.enforcementStatus,
    "executed",
  );

  assert.equal(
    successEvidence?.executionOutcome,
    "succeeded",
  );

  assert.equal(
    successTrace?.metadata
      ?.executionComponent,
    "trace-115-r15",
  );

  assert.equal(
    successEvidence?.metadata
      ?.executionComponent,
    "trace-115-r15",
  );

  console.log(
    "[PASS] succeeded finalization",
  );

  /*
   * ------------------------------------------------------------
   * 5. BLOCK -> EXECUTION MUST NEVER START
   * ------------------------------------------------------------
   */

  console.log(
    "[3] BLOCK -> prevented / not_attempted",
  );

  const blocked =
    await gate.enforce({
      agentId: agent.id,
      resourceType: "provider",
      tool: "provider:openai",
      action: "unknown.execute",
      input: {
        model: "test-model",
        prompt: "blocked execution",
      },
      metadata: {
        provider: "openai",
        model: "test-model",
      },
    });

  assert.equal(
    blocked.decision,
    "BLOCK",
  );

  assert.ok(
    blocked.traceId,
  );

  assert.ok(
    blocked.decisionId,
  );

  assert.ok(
    blocked.executionId,
  );

  assert.ok(
    blocked.evidenceId,
  );

  assert.equal(
    blocked.executionOutcome,
    "not_attempted",
  );

  const blockedTrace =
    context.decisionStore
      .getAll()
      .find(
        (item) =>
          item.decisionId ===
          blocked.decisionId,
      );

  const blockedEvidence =
    context.evidenceStore.getById(
      blocked.evidenceId!,
    );

  assert.ok(blockedTrace);
  assert.ok(blockedEvidence);

  assert.equal(
    blockedTrace?.enforcementStatus,
    "prevented",
  );

  assert.equal(
    blockedTrace?.executionOutcome,
    "not_attempted",
  );

  assert.equal(
    blockedEvidence?.enforcementStatus,
    "prevented",
  );

  assert.equal(
    blockedEvidence?.executionOutcome,
    "not_attempted",
  );

  console.log(
    "[PASS] BLOCK remains non-executed",
  );

  /*
   * ------------------------------------------------------------
   * 6. FINAL RESULT
   * ------------------------------------------------------------
   */

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 115-R15 PASSED");
  console.log(" EXECUTION FINALIZATION CONTRACT CONFIRMED");
  console.log("============================================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
