import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

console.log("");
console.log("==================================================");
console.log(" TRACE 45 - REAL PLANNER OUTPUT");
console.log("==================================================");

const runtime = new AgentRuntime();

const internal = runtime as any;

console.log("");
console.log("=== 45A - INTERNAL PLANNER ===");

const planner = internal.planner;

console.log(
  "Planner exists:",
  !!planner
);

assert.ok(
  planner,
  "AgentRuntime.planner missing"
);

console.log("PASS: Planner exists");

console.log("");
console.log("=== 45B - CREATE TEST AGENT ===");

const agent = runtime.create(
  "trace45-agent"
);

console.log(
  "Agent:",
  agent
);

assert.ok(
  agent,
  "Agent creation failed"
);

console.log(
  "Agent ID:",
  agent.id
);

console.log("PASS: Agent created");

console.log("");
console.log("=== 45C - CREATE REAL GOAL ===");

const goals = internal.goals;

const goal = goals.create(
  agent.id,
  "Use the echo tool to return the received input"
);

console.log(
  "Goal:",
  goal
);

assert.ok(
  goal,
  "Goal creation failed"
);

assert.ok(
  goal.id,
  "Goal ID missing"
);

console.log(
  "Goal ID:",
  goal.id
);

console.log(
  "Goal objective:",
  goal.objective
);

console.log("PASS: Real Goal created");

console.log("");
console.log("=== 45D - REAL PLANNER createFromGoal() ===");

const plan =
  planner.createFromGoal(
    goal.id
  );

console.log(
  "Plan:",
  plan
);

assert.ok(
  plan,
  "Planner returned no plan"
);

console.log(
  "Plan ID:",
  plan.id
);

console.log(
  "Plan goal:",
  plan.goalId
);

console.log(
  "Plan steps:",
  plan.steps
);

assert.ok(
  Array.isArray(plan.steps),
  "Plan.steps is not an array"
);

assert.ok(
  plan.steps.length > 0,
  "Planner produced zero steps"
);

console.log(
  "Step count:",
  plan.steps.length
);

console.log("");
console.log("=== 45E - REAL PLAN STEP DETAILS ===");

for (
  let i = 0;
  i < plan.steps.length;
  i++
) {
  const step = plan.steps[i];

  console.log("");
  console.log("STEP", i + 1);

  console.log(
    "id:",
    step.id
  );

  console.log(
    "order:",
    step.order
  );

  console.log(
    "description:",
    step.description
  );

  console.log(
    "description type:",
    typeof step.description
  );

  console.log(
    "description length:",
    step.description?.length
  );

  assert.equal(
    typeof step.description,
    "string",
    `Step ${i + 1} description is not a string`
  );

  assert.ok(
    step.description.length > 0,
    `Step ${i + 1} description is empty`
  );
}

console.log("");
console.log("=== 45F - RUN SELECTOR AGAINST REAL PLAN ===");

const selector =
  internal.selector;

for (
  const step of plan.steps
) {
  console.log("");
  console.log(
    "Selecting tool for:",
    step.description
  );

  const selection =
    selector.select(
      step.description
    );

  console.log(
    "Selected:",
    selection.tool.name
  );

  console.log(
    "Confidence:",
    selection.confidence
  );

  console.log(
    "Reason:",
    selection.reason
  );

  assert.equal(
    selection.tool.name,
    "echo",
    "Real planner step did not select EchoTool"
  );
}

console.log("");
console.log("==================================================");
console.log(" TRACE 45 COMPLETE - ALL ASSERTIONS PASSED");
console.log("==================================================");
