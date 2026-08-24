import assert from "node:assert/strict";
import { AgentRuntime } from "../../src/agent/runtime/agent-runtime";

async function main() {

  console.log("");
  console.log("============================================================");
  console.log("TRACE 82-C LIVE STATE MACHINE");
  console.log("============================================================");
  console.log("");

  const runtime = new AgentRuntime();

  const agentId = "trace-82c-agent";

  console.log("--- CREATE AGENT ---");

  const agent = runtime.create(
    agentId,
    {
      trace: "82-C"
    }
  );

  console.log("Agent object state:", agent.getState());

  const registryBefore =
    runtime.getAgent(agentId);

  console.log("Registry before execution:", registryBefore);

  assert.ok(agent);
  assert.ok(registryBefore);

  console.log("");
  console.log("--- EXECUTE AGENT ---");

  let executionError: unknown = undefined;
  let response: unknown = undefined;

  try {

    response =
      await runtime.runAgent(
        agentId,
        "TRACE 82-C lifecycle verification"
      );

    console.log("Execution response:", response);

  } catch (error) {

    executionError = error;

    console.log(
      "Execution error:",
      error instanceof Error
        ? error.message
        : String(error)
    );
  }

  console.log("");
  console.log("--- AGENT OBJECT AFTER EXECUTION ---");

  const agentState =
    agent.getState();

  console.log(agentState);

  console.log("");
  console.log("--- REGISTRY AFTER EXECUTION ---");

  const registryAgent =
    runtime.getAgent(agentId);

  console.log(registryAgent);

  console.log("");
  console.log("--- GOALS ---");

  const goals =
    runtime.getState().goals;

  console.dir(
    goals,
    { depth: null }
  );

  console.log("");
  console.log("--- PLANS ---");

  const plans =
    runtime.getState().plannerPlans;

  console.dir(
    plans,
    { depth: null }
  );

  console.log("");
  console.log("--- LOOP STATE ---");

  const loop =
    runtime.getState().loop;

  console.dir(
    loop,
    { depth: null }
  );

  console.log("");
  console.log("--- EVENTS ---");

  const events =
    runtime.getEventStore().getAll();

  console.dir(
    events,
    { depth: null }
  );

  console.log("");
  console.log("--- SNAPSHOTS ---");

  const snapshots =
    runtime.getSnapshots();

  console.dir(
    snapshots,
    { depth: null }
  );

  console.log("");
  console.log("--- HEALTH ---");

  const health =
    runtime.getHealthSummary();

  console.dir(
    health,
    { depth: null }
  );

  console.log("");
  console.log("============================================================");
  console.log("TRACE 82-C ASSERTIONS");
  console.log("============================================================");

  console.log(
    "Agent object final status:",
    agentState.status
  );

  console.log(
    "Registry final status:",
    registryAgent?.status
  );

  console.log(
    "Goal final status:",
    goals.length > 0
      ? goals[goals.length - 1].status
      : "NO_GOAL"
  );

  console.log(
    "Loop final status:",
    loop.status
  );

  console.log(
    "Loop iterations:",
    loop.iteration
  );

  console.log(
    "Execution error:",
    executionError
      ? "YES"
      : "NO"
  );

  console.log(
    "Event count:",
    events.length
  );

  console.log("");

  if (!executionError) {

    console.log(
      "ASSERT agent object == completed:",
      agentState.status === "completed"
    );

    console.log(
      "ASSERT registry == completed:",
      registryAgent?.status === "completed"
    );

    console.log(
      "ASSERT loop == completed:",
      loop.status === "completed"
    );

    console.log(
      "ASSERT goal == completed:",
      goals.length > 0 &&
      goals[goals.length - 1].status === "completed"
    );

  } else {

    console.log(
      "ASSERT agent object == failed:",
      agentState.status === "failed"
    );

    console.log(
      "ASSERT registry == failed:",
      registryAgent?.status === "failed"
    );

    console.log(
      "ASSERT loop == failed:",
      loop.status === "failed"
    );

    console.log(
      "ASSERT goal == failed:",
      goals.length > 0 &&
      goals[goals.length - 1].status === "failed"
    );
  }

  console.log("");
  console.log("============================================================");
  console.log("TRACE 82-C COMPLETE");
  console.log("============================================================");
  console.log("");

}

main().catch(error => {

  console.error("");
  console.error("TRACE 82-C FATAL ERROR");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exit(1);

});
