import assert from "node:assert/strict";

import {
  DelegationAuthority,
} from "../src/authorization/delegation-authority";

import {
  ToolRegistry,
} from "../src/tools/tool-registry";

import {
  RuntimeContext,
} from "../src/context/runtime-context";

import {
  Agent,
} from "../src/agent/core/agent";

import {
  EnforcementGate,
} from "../src/enforcement";

async function main(): Promise<void> {
  console.log("");
  console.log("==================================================");
  console.log(" TRACE 102 - DELEGATED EXECUTION BOUNDARY");
  console.log("==================================================");

  const context =
    new RuntimeContext();

  const agentIds = [
    "parent-agent",
    "child-agent",
    "attacker-agent",
  ];

  for (const agentId of agentIds) {
    context.agentRegistry.register(
      new Agent({
        id: agentId,
        name: agentId,
      }),
    );
  }

  const gate =
    new EnforcementGate(
      context,
    );

  const authority =
    new DelegationAuthority();

  const registry =
    new ToolRegistry(
      Symbol("trace102-execution"),
    );

  registry.setEnforcementGate(
    gate,
  );

  registry.setDelegationAuthority(
    authority,
  );

  let executed = 0;

  registry.register({
    name: "echo",
    description: "Trace 102 echo tool",
    async execute(input) {
      executed++;
      return input;
    },
  });

  const isRegistered =
    (id: string) =>
      context.agentRegistry.getById(id) !== undefined;

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

  console.log("");
  console.log("=== 102A - VALID DELEGATED EXECUTION ===");

  const result =
    await registry.executeDelegated(
      "echo",
      {
        message:
          "delegated execution",
      },
      {
        agentId: "child-agent",
      },
      "parent-agent",
      "child-agent",
      capability.id,
      "echo",
    );

  assert.deepEqual(
    result,
    {
      message:
        "delegated execution",
    },
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: delegated capability crossed real governed ToolRegistry execution boundary",
  );

  console.log("");
  console.log("=== 102B - REPLAY ===");

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          message:
            "replay",
        },
        {
          agentId: "child-agent",
        },
        "parent-agent",
        "child-agent",
        capability.id,
        "echo",
      ),
    /already consumed/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: delegated capability replay cannot execute tool",
  );

  console.log("");
  console.log("=== 102C - FORGED PARENT ===");

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

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          message:
            "forged parent",
        },
        {
          agentId: "child-agent",
        },
        "attacker-agent",
        "child-agent",
        forgedParent.id,
        "echo",
      ),
    /parent identity mismatch/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: forged parent cannot cross execution boundary",
  );

  console.log("");
  console.log("=== 102D - FORGED CHILD ===");

  const forgedChild =
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

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          message:
            "forged child",
        },
        {
          agentId: "attacker-agent",
        },
        "parent-agent",
        "child-agent",
        forgedChild.id,
        "echo",
      ),
    /child identity does not match/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: forged child cannot execute under delegated authority",
  );

  console.log("");
  console.log("=== 102E - TOOL SCOPE ESCALATION ===");

  const restricted =
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

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "unknown-tool",
        {},
        {
          agentId: "child-agent",
        },
        "parent-agent",
        "child-agent",
        restricted.id,
        "unknown-tool",
      ),
    /Delegated tool not permitted/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: delegated tool scope escalation rejected",
  );

  console.log("");
  console.log("=== 102F - DIRECT BYPASS ===");

  await assert.rejects(
    () =>
      registry.execute(
        "echo",
        {},
        {
          agentId: "child-agent",
        },
        Symbol("forged-token"),
      ),
    /Direct ToolRegistry execution is not authorized/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: direct forged execution token cannot bypass boundary",
  );

  console.log("");
  console.log("=== 102G - FINAL INVARIANT ===");

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: exactly one tool execution occurred",
  );

  console.log(
    "PASS: replay produced zero additional execution",
  );

  console.log(
    "PASS: forged identities produced zero execution",
  );

  console.log(
    "PASS: scope escalation produced zero execution",
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 102 COMPLETE");
  console.log("==================================================");
  console.log(
    "TRACE102: DELEGATED EXECUTION BOUNDARY PASS",
  );
}

main().catch((error: unknown) => {
  console.error("");
  console.error("TRACE 102 FAILED");
  console.error(error);
  process.exitCode = 1;
});

