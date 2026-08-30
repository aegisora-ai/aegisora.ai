import assert from "node:assert/strict";

import {
  DelegationAuthority,
} from "../src/authorization/delegation-authority";

const registered =
  new Set([
    "parent-agent",
    "child-agent",
    "other-agent",
  ]);

const authority =
  new DelegationAuthority();

const isRegistered =
  (id: string) =>
    registered.has(id);

console.log("");
console.log("==================================================");
console.log(" TRACE 101 - DELEGATED AGENT AUTHORITY");
console.log("==================================================");

console.log("");
console.log("=== 101A - ISSUE SCOPED CAPABILITY ===");

const capability =
  authority.issue(
    "parent-agent",
    "child-agent",
    {
      actions: [
        "tool.execute",
      ],
      tools: [
        "echo",
      ],
    },
    10_000,
    isRegistered,
  );

assert.equal(
  capability.parentAgentId,
  "parent-agent",
);

assert.equal(
  capability.childAgentId,
  "child-agent",
);

assert.deepEqual(
  capability.scope.actions,
  ["tool.execute"],
);

console.log(
  "PASS: parent identity bound",
);

console.log(
  "PASS: child identity bound",
);

console.log(
  "PASS: tool scope bound",
);

console.log("");
console.log("=== 101B - VALID CONSUMPTION ===");

authority.consume(
  capability.id,
  "parent-agent",
  "child-agent",
  "tool.execute",
  "echo",
);

console.log(
  "PASS: valid delegated authority consumed",
);

console.log("");
console.log("=== 101C - REPLAY RESISTANCE ===");

assert.throws(
  () =>
    authority.consume(
      capability.id,
      "parent-agent",
      "child-agent",
      "tool.execute",
      "echo",
    ),
  /already consumed/,
);

console.log(
  "PASS: replay rejected",
);

console.log("");
console.log("=== 101D - FORGED PARENT ===");

const forgedParent =
  authority.issue(
    "parent-agent",
    "child-agent",
    {
      actions: [
        "tool.execute",
      ],
      tools: [
        "echo",
      ],
    },
    10_000,
    isRegistered,
  );

assert.throws(
  () =>
    authority.consume(
      forgedParent.id,
      "other-agent",
      "child-agent",
      "tool.execute",
      "echo",
    ),
  /parent identity mismatch/,
);

console.log(
  "PASS: forged parent rejected",
);

console.log("");
console.log("=== 101E - FORGED CHILD ===");

assert.throws(
  () =>
    authority.consume(
      forgedParent.id,
      "parent-agent",
      "other-agent",
      "tool.execute",
      "echo",
    ),
  /child identity mismatch/,
);

console.log(
  "PASS: forged child rejected",
);

console.log("");
console.log("=== 101F - TOOL SCOPE ESCALATION ===");

assert.throws(
  () =>
    authority.consume(
      forgedParent.id,
      "parent-agent",
      "child-agent",
      "tool.execute",
      "shell",
    ),
  /tool not permitted/,
);

console.log(
  "PASS: tool scope escalation rejected",
);

console.log("");
console.log("=== 101G - UNKNOWN AGENTS ===");

assert.throws(
  () =>
    authority.issue(
      "unknown-parent",
      "child-agent",
      {
        actions: [
          "tool.execute",
        ],
      },
      10_000,
      isRegistered,
    ),
  /Unknown parent agent/,
);

assert.throws(
  () =>
    authority.issue(
      "parent-agent",
      "unknown-child",
      {
        actions: [
          "tool.execute",
        ],
      },
      10_000,
      isRegistered,
    ),
  /Unknown child agent/,
);

console.log(
  "PASS: unknown parent rejected",
);

console.log(
  "PASS: unknown child rejected",
);

console.log("");
console.log("=== 101H - INVALID TTL ===");

assert.throws(
  () =>
    authority.issue(
      "parent-agent",
      "child-agent",
      {
        actions: [
          "tool.execute",
        ],
      },
      0,
      isRegistered,
    ),
  /TTL must be positive/,
);

console.log(
  "PASS: invalid TTL rejected",
);

console.log("");
console.log("==================================================");
console.log(" TRACE 101 COMPLETE");
console.log("==================================================");
console.log("TRACE101: ALL DELEGATION SECURITY CHECKS PASSED");
