import assert from "node:assert/strict";
import { AgentRuntime } from "../../src/agent/runtime/agent-runtime";

async function main() {
  const runtime = new AgentRuntime();
  const id = "trace-82f-agent";

  runtime.create(id);

  await runtime.runAgent(
    id,
    "TRACE 82-F goal lifecycle"
  );

  const state = runtime.getState();
  const agent = runtime.getAgent(id);
  const goal = state.goals[state.goals.length - 1];

  console.log("");
  console.log("TRACE 82-F");
  console.log("Agent:", agent?.status);
  console.log("Goal:", goal?.status);
  console.log("Loop:", state.loop.status);

  assert.equal(agent?.status, "completed");
  assert.equal(goal?.status, "completed");
  assert.equal(state.loop.status, "completed");

  console.log("RESULT: PASS");
}

main().catch(error => {
  console.error("RESULT: FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
