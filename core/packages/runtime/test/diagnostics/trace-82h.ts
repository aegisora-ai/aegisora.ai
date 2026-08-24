import assert from "node:assert/strict";
import { AgentRuntime } from "../../src/agent/runtime/agent-runtime";

async function main() {
  const runtime = new AgentRuntime();
  const id = "trace-82h-agent";

  runtime.create(id);

  await runtime.runAgent(
    id,
    "TRACE 82-H goal identity propagation"
  );

  const state = runtime.getState();

  const goal =
    state.goals[state.goals.length - 1];

  const plan =
    state.plannerPlans[state.plannerPlans.length - 1];

  const events =
    runtime.getEventStore().getAll();

  console.log("");
  console.log("TRACE 82-H");
  console.log("Goal:", goal?.id);
  console.log("Plan:", plan?.id);
  console.log("Plan.goalId:", plan?.goalId);
  console.log(
    "Steps:",
    plan?.steps.length
  );

  assert.ok(goal);
  assert.ok(plan);

  assert.equal(
    plan.goalId,
    goal.id
  );

  assert.ok(
    plan.steps.length > 0
  );

  for (const step of plan.steps) {
    assert.equal(
      step.goalId,
      goal.id
    );
  }

  const toolEvents =
    events.filter(
      event =>
        event.type === "tool.called"
    );

  assert.ok(
    toolEvents.length > 0
  );

  for (const event of toolEvents) {
    assert.ok(event.payload.planId);
    assert.ok(event.payload.stepId);
  }

  console.log(
    "Goal → Plan: PASS"
  );

  console.log(
    "Goal → Steps: PASS"
  );

  console.log(
    "Plan → Tool events: PASS"
  );

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
