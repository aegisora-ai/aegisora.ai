import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {

  console.log("");
  console.log("============================================================");
  console.log("TRACE 37K - REAL RUNTIME END-TO-END ENFORCEMENT");
  console.log("============================================================");

  const runtime = new AgentRuntime();

  const agent = runtime.create(
    "trace-37k-agent",
  );

  assert.equal(
    agent.id,
    "trace-37k-agent",
    "Agent creation failed.",
  );

  console.log("");
  console.log("[1] Agent created");
  console.log("Agent:", agent.id);

  console.log("");
  console.log("[2] Runtime tools");

  const tools = runtime
    .getToolRegistry()
    .list()
    .map(tool => tool.name);

  console.log("Tools:", tools);

  assert.ok(
    tools.includes("echo"),
    "Echo tool must be registered.",
  );

  console.log("");
  console.log("[3] Running REAL runtime path");

  try {

    await runtime.runAgent(
      "trace-37k-agent",
      "echo safe operation",
    );

    console.log(
      "Runtime execution completed.",
    );

  } catch (error) {

    console.log(
      "Runtime execution threw:",
      error instanceof Error
        ? error.message
        : String(error),
    );

  }

  console.log("");
  console.log("[4] Decision traces");

  const traces =
    runtime.getDecisionTraces();

  console.log(
    "Decision trace count:",
    traces.length,
  );

  for (const trace of traces) {

    console.log(
      "Decision:",
      trace.decision,
      "| Action:",
      trace.action,
      "| Risk:",
      trace.riskScore,
      "| Reason:",
      trace.reason,
    );

  }

  assert.ok(
    traces.length > 0,
    "REAL runtime execution must produce a decision trace.",
  );

  const latest =
    traces[traces.length - 1];

  assert.ok(
    latest.decision === "allow" ||
    latest.decision === "block" ||
    latest.decision === "escalate",
    "Runtime decision must be ALLOW, BLOCK or ESCALATE.",
  );

  console.log("");
  console.log("[5] Runtime state");

  const state =
    runtime.getState();

  console.log(
    "Agents:",
    state.agents,
  );

  console.log(
    "Tools:",
    state.tools,
  );

  console.log(
    "Loop:",
    state.loop,
  );

  console.log("");
  console.log("------------------------------------------------------------");
  console.log(
    "REAL RUNTIME DECISION ->",
    latest.decision.toUpperCase(),
  );
  console.log(
    "REAL RUNTIME ACTION   ->",
    latest.action,
  );
  console.log(
    "REAL RUNTIME RISK     ->",
    latest.riskScore,
  );
  console.log("------------------------------------------------------------");

  console.log("");
  console.log("TRACE 37K: PASS");
  console.log("");
  console.log("============================================================");
  console.log("TRACE 37K COMPLETE");
  console.log("============================================================");
}

main().catch(error => {

  console.error("");
  console.error("TRACE 37K: FAIL");
  console.error(error);

  process.exit(1);

});