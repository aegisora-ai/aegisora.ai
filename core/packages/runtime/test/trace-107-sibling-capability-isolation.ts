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
  console.log(" TRACE 107 - SIBLING CAPABILITY ISOLATION");
  console.log("==================================================");

  const context =
    new RuntimeContext();

  for (const agentId of [
    "trace107-parent",
    "trace107-child-a",
    "trace107-child-b",
    "trace107-attacker",
  ]) {
    context.agentRegistry.register(
      new Agent({
        id: agentId,
        name: agentId,
      }),
    );
  }

  const isRegistered =
    (id: string) =>
      context.agentRegistry.getById(id) !== undefined;

  const authority =
    new DelegationAuthority();

  const gate =
    new EnforcementGate(
      context,
    );

  const registry =
    new ToolRegistry(
      Symbol("trace107-execution"),
    );

  registry.setEnforcementGate(gate);
  registry.setDelegationAuthority(authority);

  let executed = 0;

  registry.register({
    name: "echo",
    description: "Trace 107 isolated tool",
    async execute(input) {
      executed++;
      return input;
    },
  });

  console.log("");
  console.log("=== 107A - PARENT ISSUES CAPABILITY TO CHILD-A ===");

  const childACapability =
    authority.issue(
      "trace107-parent",
      "trace107-child-a",
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
    childACapability.childAgentId,
    "trace107-child-a",
  );

  console.log(
    "PASS: capability is bound to child-A identity",
  );

  console.log("");
  console.log("=== 107B - CHILD-A VALID EXECUTION ===");

  const valid =
    await registry.executeDelegated(
      "echo",
      {
        principal: "child-a",
      },
      {
        agentId: "trace107-child-a",
      },
      "trace107-parent",
      "trace107-child-a",
      childACapability.id,
      "echo",
    );

  assert.deepEqual(
    valid,
    {
      principal: "child-a",
    },
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: child-A can use its own delegated capability",
  );

  console.log("");
  console.log("=== 107C - CHILD-B CAPABILITY THEFT ===");

  const childBCapability =
    authority.issue(
      "trace107-parent",
      "trace107-child-b",
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
          principal: "child-b",
          attack: "reuse-child-a-capability",
        },
        {
          agentId: "trace107-child-b",
        },
        "trace107-parent",
        "trace107-child-b",
        childACapability.id,
        "echo",
      ),
    /child identity mismatch|Delegated child identity mismatch|already consumed/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: child-B cannot execute with child-A capability",
  );

  console.log("");
  console.log("=== 107D - ATTACKER CAPABILITY THEFT ===");

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          principal: "attacker",
          attack: "reuse-child-a-capability",
        },
        {
          agentId: "trace107-attacker",
        },
        "trace107-parent",
        "trace107-child-a",
        childACapability.id,
        "echo",
      ),
    /child identity does not match|Delegated child identity mismatch|already consumed/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: attacker cannot execute with child-A capability",
  );

  console.log("");
  console.log("=== 107E - CHILD-B OWN CAPABILITY REMAINS ISOLATED ===");

  const childBValid =
    await registry.executeDelegated(
      "echo",
      {
        principal: "child-b",
      },
      {
        agentId: "trace107-child-b",
      },
      "trace107-parent",
      "trace107-child-b",
      childBCapability.id,
      "echo",
    );

  assert.deepEqual(
    childBValid,
    {
      principal: "child-b",
    },
  );

  assert.equal(
    executed,
    2,
  );

  console.log(
    "PASS: child-B can only use its own capability",
  );

  console.log("");
  console.log("=== 107F - CROSS-CAPABILITY REPLAY / SWAP ===");

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          principal: "child-a",
          attack: "swap-to-child-b-context",
        },
        {
          agentId: "trace107-child-a",
        },
        "trace107-parent",
        "trace107-child-b",
        childBCapability.id,
        "echo",
      ),
    /child identity does not match|Delegated child identity mismatch|already consumed/,
  );

  assert.equal(
    executed,
    2,
  );

  console.log(
    "PASS: capability cannot be swapped across sibling identities",
  );

  console.log("");
  console.log("=== 107G - FINAL ISOLATION INVARIANT ===");

  assert.equal(
    executed,
    2,
  );

  console.log(
    "PASS: exactly two legitimate executions occurred",
  );

  console.log(
    "PASS: child-A capability stayed bound to child-A",
  );

  console.log(
    "PASS: child-B capability stayed bound to child-B",
  );

  console.log(
    "PASS: attacker produced zero execution",
  );

  console.log(
    "PASS: sibling capability theft produced zero execution",
  );

  console.log(
    "PASS: cross-capability identity swap produced zero execution",
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 107 COMPLETE");
  console.log("==================================================");

  console.log(
    "TRACE107: SIBLING CAPABILITY ISOLATION PASS",
  );
}

main().catch((error: unknown) => {
  console.error("");
  console.error("TRACE 107 FAILED");
  console.error(error);
  process.exitCode = 1;
});
