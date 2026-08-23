import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {

  console.log("");
  console.log("TRACE 113 - COLLABORATION GOVERNANCE BOUNDARY");
  console.log("============================================================");

  const runtime = new AgentRuntime();

  const actor =
    runtime.create("trace-113-actor");

  const member =
    runtime.create("trace-113-member");

  const collaboration =
    runtime.getCollaborationManager();

  assert.ok(
    collaboration,
    "CollaborationManager must be runtime-owned",
  );

  console.log("PASS: Runtime created.");
  console.log("PASS: Canonical agents created.");
  console.log("PASS: CollaborationManager is runtime-owned.");

  /*
   * ALLOW: createTeam
   */

  const team =
    await collaboration.createTeam(
      actor.id,
      "trace-113-team",
      [actor.id, member.id],
    );

  assert.equal(
    team.members.includes(actor.id),
    true,
  );

  assert.equal(
    team.members.includes(member.id),
    true,
  );

  console.log(
    "PASS: ALLOW -> createTeam crossed governance boundary.",
  );

  /*
   * ALLOW: assignTask
   */

  const task =
    await collaboration.assignTask(
      actor.id,
      team.id,
      member.id,
      "TRACE 113 governed collaboration task",
    );

  assert.equal(
    task.teamId,
    team.id,
  );

  assert.equal(
    task.assignedAgent,
    member.id,
  );

  console.log(
    "PASS: ALLOW -> assignTask crossed governance boundary.",
  );

  /*
   * ALLOW: completeTask
   */

  const completed =
    await collaboration.completeTask(
      member.id,
      task.id,
      {
        ok: true,
        trace: "113",
      },
    );

  assert.equal(
    completed.status,
    "completed",
  );

  console.log(
    "PASS: ALLOW -> completeTask crossed governance boundary.",
  );

  /*
   * BLOCK: forged actor
   */

  let forgedBlocked = false;

  try {
    await collaboration.createTeam(
      "trace-113-FORGED",
      "forged-team",
      [actor.id],
    );
  } catch (error) {
    forgedBlocked = String(error)
      .includes("[ENFORCEMENT:BLOCK]");

    console.log(
      `Forged actor rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    forgedBlocked,
    true,
  );

  console.log(
    "PASS: BLOCK -> forged actor produced zero team side effect.",
  );

  assert.equal(
    collaboration.getTeam("forged-team"),
    undefined,
  );

  /*
   * BLOCK: non-member task assignment
   */

  const outsider =
    runtime.create("trace-113-outsider");

  let outsiderBlocked = false;

  try {
    await collaboration.assignTask(
      outsider.id,
      team.id,
      member.id,
      "forged assignment",
    );
  } catch {
    outsiderBlocked = true;
  }

  assert.equal(
    outsiderBlocked,
    true,
  );

  assert.equal(
    collaboration.tasksList().length,
    1,
  );

  console.log(
    "PASS: BLOCK -> non-member assignment produced zero task side effect.",
  );

  /*
   * FINAL
   */

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 113 PASSED");
  console.log(" COLLABORATION GOVERNANCE BOUNDARY CLOSED");
  console.log("============================================================");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 113 FAILED");
  console.error(error);
  process.exitCode = 1;
});