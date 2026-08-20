import assert from "node:assert/strict";
import { AgentRuntime } from "../packages/runtime/src/agent/runtime/agent-runtime";

async function main() {
  const runtime = new AgentRuntime();
  const id = "trace-82i-agent";

  runtime.create(id);

  await runtime.runAgent(
    id,
    "TRACE 82-I event correlation"
  );

  const state = runtime.getState();
  const goal = state.goals[state.goals.length - 1];
  const plan = state.plannerPlans[state.plannerPlans.length - 1];
  const events = runtime.getEventStore().getAll();

  assert.ok(goal);
  assert.ok(plan);

  const agentEvents =
    events.filter(e => e.agentId === id);

  const created =
    agentEvents.find(e => e.type === "agent.created");

  const started =
    agentEvents.find(e => e.type === "agent.started");

  const completed =
    agentEvents.find(e => e.type === "agent.completed");

  const toolEvents =
    agentEvents.filter(e => e.type === "tool.called");

  assert.ok(created);
  assert.ok(started);
  assert.ok(completed);
  assert.equal(toolEvents.length, plan.steps.length);

  for (const event of toolEvents) {
    assert.equal(
      event.agentId,
      id
    );

    assert.ok(
      event.payload.planId
    );

    assert.ok(
      event.payload.stepId
    );

    assert.equal(
      event.payload.planId,
      plan.id
    );

    assert.ok(
      plan.steps.some(
        step =>
          step.id === event.payload.stepId
      )
    );
  }

  console.log("");
  console.log("TRACE 82-I");
  console.log("Agent events:", agentEvents.length);
  console.log("Tool events:", toolEvents.length);
  console.log("Plan steps:", plan.steps.length);
  console.log("Agent correlation: PASS");
  console.log("Plan correlation: PASS");
  console.log("Step correlation: PASS");
  console.log("");
  console.log("RESULT: PASS");
}

main().catch(error => {
  console.error("");
  console.error("RESULT: FAIL");
  console.error(
    error instanceof Error
      ? error.stack
      : error
  );
  process.exit(1);
});
