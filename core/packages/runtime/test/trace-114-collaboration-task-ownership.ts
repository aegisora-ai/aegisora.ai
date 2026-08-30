import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main(): Promise<void> {
  console.log("");
  console.log("==================================================");
  console.log(" TRACE 114 - COLLABORATION TASK OWNERSHIP");
  console.log("==================================================");

  const runtime = new AgentRuntime();

  const actor = runtime.create("trace114-actor");
  const assigned = runtime.create("trace114-assigned");
  const sibling = runtime.create("trace114-sibling");
  const outsider = runtime.create("trace114-outsider");

  const collaboration =
    runtime.getCollaborationManager();

  const teamA =
    await collaboration.createTeam(
      actor.id,
      "trace114-team-a",
      [
        actor.id,
        assigned.id,
        sibling.id,
      ],
    );

  const teamB =
    await collaboration.createTeam(
      outsider.id,
      "trace114-team-b",
      [
        outsider.id,
      ],
    );

  console.log("");
  console.log("=== 114A - ASSIGN TASK TO CANONICAL AGENT ===");

  const task =
    await collaboration.assignTask(
      actor.id,
      teamA.id,
      assigned.id,
      "TRACE 114 ownership boundary",
    );

  assert.equal(
    task.assignedAgent,
    assigned.id,
  );

  assert.equal(
    task.status,
    "idle",
  );

  console.log(
    "PASS: task is canonically bound to assigned agent",
  );

  console.log("");
  console.log("=== 114B - ASSIGNED AGENT COMPLETION ===");

  const completed =
    await collaboration.completeTask(
      assigned.id,
      task.id,
      {
        completedBy: assigned.id,
      },
    );

  assert.equal(
    completed.status,
    "completed",
  );

  assert.deepEqual(
    completed.result,
    {
      completedBy: assigned.id,
    },
  );

  console.log(
    "PASS: assigned agent can complete its own task",
  );

  console.log("");
  console.log("=== 114C - SIBLING MEMBER CANNOT COMPLETE ASSIGNED TASK ===");

  const task2 =
    await collaboration.assignTask(
      actor.id,
      teamA.id,
      assigned.id,
      "TRACE 114 sibling completion rejection",
    );

  await assert.rejects(
    () =>
      collaboration.completeTask(
        sibling.id,
        task2.id,
        {
          completedBy: sibling.id,
          attack: "sibling-completion",
        },
      ),
    /assigned|member|permission|not authorized/i,
  );

  assert.equal(
    task2.status,
    "idle",
  );

  assert.equal(
    collaboration.getTask(task2.id)?.result,
    undefined,
  );

  console.log(
    "PASS: sibling member cannot complete another agent's task",
  );

  console.log("");
  console.log("=== 114D - OUTSIDER CANNOT COMPLETE TASK ===");

  await assert.rejects(
    () =>
      collaboration.completeTask(
        outsider.id,
        task2.id,
        {
          completedBy: outsider.id,
        },
      ),
    /member/i,
  );

  assert.equal(
    task2.status,
    "idle",
  );

  console.log(
    "PASS: non-member cannot complete task",
  );

  console.log("");
  console.log("=== 114E - CROSS-TEAM TASK ACCESS ===");

  await assert.rejects(
    () =>
      collaboration.assignTask(
        outsider.id,
        teamB.id,
        assigned.id,
        "cross-team forged assignment",
      ),
    /member/i,
  );

  assert.equal(
    collaboration.tasksList().length,
    2,
  );

  console.log(
    "PASS: cross-team actor cannot create unauthorized assignment",
  );

  console.log("");
  console.log("=== 114F - COMPLETED TASK IMMUTABILITY ===");

  const firstCompletion =
    await collaboration.completeTask(
      assigned.id,
      task2.id,
      {
        completedBy: assigned.id,
        attempt: "first-completion",
      },
    );

  assert.equal(
    firstCompletion.status,
    "completed",
  );

  console.log(
    "PASS: assigned agent can complete the task exactly once",
  );

  await assert.rejects(
    () =>
      collaboration.completeTask(
        assigned.id,
        task2.id,
        {
          completedBy: assigned.id,
          attempt: "second-completion",
        },
      ),
    /completed|terminal|already/i,
  );

  assert.equal(
    collaboration.getTask(task2.id)?.status,
    "completed",
  );

  console.log(
    "PASS: task completion cannot be silently replayed",
  );

  console.log("");
  console.log("=== 114G - FINAL OWNERSHIP INVARIANT ===");

  assert.equal(
    task.assignedAgent,
    assigned.id,
  );

  assert.equal(
    task2.assignedAgent,
    assigned.id,
  );

  assert.equal(
    task2.status,
    "completed",
  );

  assert.equal(
    collaboration.tasksList().length,
    2,
  );

  console.log(
    "PASS: task ownership remained canonical",
  );

  console.log(
    "PASS: sibling produced zero unauthorized completion",
  );

  console.log(
    "PASS: outsider produced zero unauthorized completion",
  );

  console.log(
    "PASS: cross-team access produced zero task side effect",
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 114 COMPLETE");
  console.log("==================================================");
  console.log(
    "TRACE114: COLLABORATION TASK OWNERSHIP PASS",
  );
}

main().catch((error: unknown) => {
  console.error("");
  console.error("TRACE 114 FAILED");
  console.error(error);
  process.exitCode = 1;
});

