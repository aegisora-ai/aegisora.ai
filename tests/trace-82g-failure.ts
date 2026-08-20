import assert from "node:assert/strict";
import { AgentRuntime } from "../packages/runtime/src/agent/runtime/agent-runtime";

async function main() {
  const runtime = new AgentRuntime();
  const id = "trace-82g-agent";

  const agent = runtime.create(id);

  /*
   * Force the loop to fail so we can verify that
   * AgentRuntime propagates the failure to GoalManager.
   */
  const loop = (runtime as any).loop;

  loop.run = async () => {
    throw new Error("TRACE 82-G forced execution failure");
  };

  let failed = false;

  try {
    await runtime.runAgent(
      id,
      "TRACE 82-G failure lifecycle"
    );
  } catch (error) {
    failed = true;
    console.log(
      "Caught expected error:",
      error instanceof Error ? error.message : String(error)
    );
  }

  const state = runtime.getState();
  const goal = state.goals[state.goals.length - 1];

  console.log("");
  console.log("TRACE 82-G");
  console.log("Agent:", agent.getState().status);
  console.log("Goal:", goal?.status);
  console.log("Loop: forced failure");
  console.log("Error caught:", failed ? "YES" : "NO");

  assert.equal(failed, true);
  assert.equal(agent.getState().status, "failed");
  assert.equal(goal?.status, "failed");

  console.log("");
  console.log("RESULT: PASS");
}

main().catch(error => {
  console.error("");
  console.error("RESULT: FAIL");
  console.error(error instanceof Error ? error.stack : error);
  process.exit(1);
});
