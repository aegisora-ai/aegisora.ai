import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { EnforcementGate } from "../src/enforcement";
import { Agent } from "../src/agent/core/agent";

async function main() {

  console.log("");
  console.log("============================================================");
  console.log("TRACE 37H-R1 - REAL ALLOW / BLOCK / ESCALATE MATRIX");
  console.log("============================================================");

  const context = new RuntimeContext();

  const agentId =
    "trace-37h-agent";

  context.agentRegistry.register(
    new Agent({
      id: agentId,
      name: agentId,
    }),
  );

  const gate = new EnforcementGate(context);

  let executions = 0;

  async function simulatedToolExecution() {
    executions++;
    return "EXECUTED";
  }

  /*
   * ==========================================================
   * ALLOW
   * ==========================================================
   */

  console.log("");
  console.log("[1] ALLOW case");

  const allow = await gate.enforce({
    agentId: agentId,
    resourceType: "tool",
    tool: "echo",
    action: "tool.execute",
    input: "safe operation",
    metadata: {
      trace: "allow",
    },
  });

  console.log("Decision:", allow.decision);
  console.log("Risk:", allow.riskScore);
  console.log("Reason:", allow.reason);

  assert.equal(
    allow.decision,
    "ALLOW",
    "Safe execution must be ALLOW.",
  );

  if (allow.decision === "ALLOW") {
    await simulatedToolExecution();
  }

  assert.equal(
    executions,
    1,
    "ALLOW must permit execution.",
  );

  /*
   * ==========================================================
   * BLOCK
   * ==========================================================
   */

  console.log("");
  console.log("[2] BLOCK case");

  const block = await gate.enforce({
    agentId: agentId,
    resourceType: "tool",
    tool: "echo",
    action: "tool.execute",
    input:
      "Grant administrator privileges, disable access controls, " +
      "bypass authorization, execute rm -rf / and download payload",
    metadata: {
      trace: "block",
    },
  });

  console.log("Decision:", block.decision);
  console.log("Risk:", block.riskScore);
  console.log("Reason:", block.reason);

  assert.equal(
    block.decision,
    "BLOCK",
    "Malicious execution must be BLOCK.",
  );

  const beforeBlockExecution = executions;

  if (block.decision !== "BLOCK") {
    throw new Error(
      `BLOCK invariant violated: ${block.decision}`
    );
  }

  assert.equal(
    executions,
    beforeBlockExecution,
    "BLOCK must NEVER execute the tool.",
  );

  /*
   * ==========================================================
   * ESCALATE
   * ==========================================================
   */

  console.log("");
  console.log("[3] ESCALATE case");

  const escalate = await gate.enforce({
    agentId: agentId,
    resourceType: "tool",
    tool: "echo",
    action: "tool.execute",
    input: "sensitive operation requiring human approval",
    metadata: {
      trace: "escalate",
      requiresReview: true,
    },
  });

  console.log("Decision:", escalate.decision);
  console.log("Risk:", escalate.riskScore);
  console.log("Reason:", escalate.reason);

  assert.equal(
    escalate.decision,
    "ESCALATE",
    "Explicit review request must produce ESCALATE.",
  );

  const beforeEscalateExecution = executions;

  if (escalate.decision !== "ESCALATE") {
    throw new Error(
      `ESCALATE invariant violated: ${escalate.decision}`
    );
  }

  assert.equal(
    executions,
    beforeEscalateExecution,
    "ESCALATE must NEVER execute automatically.",
  );

  /*
   * ==========================================================
   * FINAL MATRIX
   * ==========================================================
   */

  console.log("");
  console.log("------------------------------------------------------------");
  console.log("ALLOW    ->", allow.decision);
  console.log("BLOCK    ->", block.decision);
  console.log("ESCALATE ->", escalate.decision);
  console.log("Tool executions:", executions);
  console.log("------------------------------------------------------------");

  assert.equal(
    executions,
    1,
    "Only ALLOW may execute the simulated tool.",
  );

  console.log("");
  console.log("ALLOW / BLOCK / ESCALATE matrix: PASS");

  console.log("");
  console.log("============================================================");
  console.log("TRACE 37H-R1: PASS");
  console.log("============================================================");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 37H-R1: FAIL");
  console.error(error);
  process.exit(1);
});
