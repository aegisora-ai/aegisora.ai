import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { EnforcementGate } from "../src/enforcement";

async function main() {
  console.log("");
  console.log("============================================================");
  console.log(" TRACE 116-R16 :: EVIDENCE PERSISTENCE");
  console.log("============================================================");
  console.log("");

  const context = new RuntimeContext();

  context.agentRegistry.register({
    id: "trace-116-r16-agent",
    name: "trace-116-r16-agent",
  });

  const agent =
    context.agentRegistry.getById("trace-116-r16-agent");

  assert.ok(agent);

  console.log("[PASS] canonical agent registration");

  const gate = new EnforcementGate(context);

  // ------------------------------------------------------------
  // ALLOW
  // ------------------------------------------------------------

  console.log("[1] ALLOW -> canonical evidence persistence");

  const allowed = await gate.enforce({
    agentId: agent.id,
    resourceType: "provider",
    tool: "provider:openai",
    action: "provider.generate",
    input: {
      model: "test-model",
      prompt: "trace-116-r16 evidence persistence",
    },
    metadata: {
      provider: "openai",
      model: "test-model",
    },
  });

  assert.equal(allowed.decision, "ALLOW");
  assert.ok(allowed.traceId);
  assert.ok(allowed.decisionId);
  assert.ok(allowed.executionId);
  assert.ok(allowed.evidenceId);
  assert.equal(allowed.executionOutcome, "not_attempted");

  const evidence =
    context.evidenceStore.getById(allowed.evidenceId!);

  assert.ok(evidence);
  assert.equal(evidence.evidenceId, allowed.evidenceId);
  assert.equal(evidence.traceId, allowed.traceId);
  assert.equal(evidence.decisionId, allowed.decisionId);
  assert.equal(evidence.executionId, allowed.executionId);
  assert.equal(evidence.agentId, agent.id);
  assert.equal(evidence.finalDecision, "ALLOW");
  assert.equal(evidence.enforcementStatus, "not_executed");
  assert.equal(evidence.executionOutcome, "not_attempted");
  assert.equal(evidence.status, "recorded");

  console.log("[PASS] canonical evidence persisted");

  // ------------------------------------------------------------
  // FINALIZE
  // ------------------------------------------------------------

  console.log("[2] FINALIZE -> evidence synchronized");

  const finalized =
    context.decisionStore.finalize(
      allowed.decisionId!,
      {
        enforcementStatus: "executed",
        executionOutcome: "succeeded",
        metadata: {
          executionComponent: "trace-116-r16",
        },
      },
    );

  assert.equal(finalized, true);

  const finalizedEvidence =
    context.evidenceStore.getById(allowed.evidenceId!);

  assert.ok(finalizedEvidence);
  assert.equal(
    finalizedEvidence.enforcementStatus,
    "executed",
  );
  assert.equal(
    finalizedEvidence.executionOutcome,
    "succeeded",
  );
  assert.equal(
    finalizedEvidence.metadata?.executionComponent,
    "trace-116-r16",
  );

  console.log("[PASS] evidence finalization synchronized");

  // ------------------------------------------------------------
  // TRACE QUERY
  // ------------------------------------------------------------

  console.log("[3] QUERY BY TRACE");

  const byTrace =
    context.evidenceStore.getByTraceId(allowed.traceId!);

  assert.equal(byTrace.length, 1);
  assert.equal(byTrace[0]?.evidenceId, allowed.evidenceId);

  console.log("[PASS] getByTraceId()");

  // ------------------------------------------------------------
  // DECISION QUERY
  // ------------------------------------------------------------

  console.log("[4] QUERY BY DECISION");

  const byDecision =
    context.evidenceStore.getByDecisionId(
      allowed.decisionId!,
    );

  assert.equal(byDecision.length, 1);
  assert.equal(
    byDecision[0]?.evidenceId,
    allowed.evidenceId,
  );

  console.log("[PASS] getByDecisionId()");

  // ------------------------------------------------------------
  // AGENT QUERY
  // ------------------------------------------------------------

  console.log("[5] QUERY BY AGENT");

  const byAgent =
    context.evidenceStore.getByAgent(agent.id);

  assert.equal(byAgent.length, 1);
  assert.equal(
    byAgent[0]?.evidenceId,
    allowed.evidenceId,
  );

  console.log("[PASS] getByAgent()");

  // ------------------------------------------------------------
  // BLOCK
  // ------------------------------------------------------------

  console.log("[6] BLOCK -> evidence remains persisted");

  const blocked = await gate.enforce({
    agentId: agent.id,
    resourceType: "provider",
    tool: "provider:openai",
    action: "unknown.execute",
    input: {
      model: "test-model",
      prompt: "blocked evidence path",
    },
    metadata: {
      provider: "openai",
      model: "test-model",
    },
  });

  assert.equal(blocked.decision, "BLOCK");
  assert.ok(blocked.evidenceId);
  assert.equal(blocked.executionOutcome, "not_attempted");

  const blockedEvidence =
    context.evidenceStore.getById(blocked.evidenceId!);

  assert.ok(blockedEvidence);
  assert.equal(blockedEvidence.finalDecision, "BLOCK");
  assert.equal(
    blockedEvidence.enforcementStatus,
    "prevented",
  );
  assert.equal(
    blockedEvidence.executionOutcome,
    "not_attempted",
  );
  assert.equal(blockedEvidence.status, "recorded");

  console.log("[PASS] BLOCK evidence persisted");

  // ------------------------------------------------------------
  // STORAGE ISOLATION
  // ------------------------------------------------------------

  console.log("[7] STORAGE ISOLATION");

  const mutable =
    context.evidenceStore.getById(
      allowed.evidenceId!,
    );

  assert.ok(mutable);

  if (mutable) {
    mutable.reason = "MUTATED OUTSIDE STORE";
  }

  const isolated =
    context.evidenceStore.getById(
      allowed.evidenceId!,
    );

  assert.notEqual(
    isolated?.reason,
    "MUTATED OUTSIDE STORE",
  );

  console.log("[PASS] evidence storage isolation");

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 116-R16 PASSED");
  console.log(" CANONICAL EVIDENCE PERSISTENCE CONFIRMED");
  console.log("============================================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
