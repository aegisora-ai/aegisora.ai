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
  console.log(" TRACE 103 - DELEGATION EXPIRY");
  console.log("==================================================");

  const context =
    new RuntimeContext();

  for (const agentId of [
    "trace103-parent",
    "trace103-child",
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
      Symbol("trace103-execution"),
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
    description: "Trace 103 echo tool",
    async execute(input) {
      executed++;
      return input;
    },
  });

  console.log("");
  console.log("=== 103A - VALID CAPABILITY BEFORE EXPIRY ===");

  const validCapability =
    authority.issue(
      "trace103-parent",
      "trace103-child",
      {
        actions: [
          "tool.execute",
        ],
        tools: [
          "echo",
        ],
      },
      2_000,
      isRegistered,
    );

  const beforeExpiry =
    await registry.executeDelegated(
      "echo",
      {
        phase: "before-expiry",
      },
      {
        agentId: "trace103-child",
      },
      "trace103-parent",
      "trace103-child",
      validCapability.id,
      "echo",
    );

  assert.deepEqual(
    beforeExpiry,
    {
      phase: "before-expiry",
    },
  );

  assert.equal(
    executed,
    1,
  );

  assert.ok(
    validCapability.expiresAt.getTime() >
      validCapability.issuedAt.getTime(),
  );

  console.log(
    "PASS: valid delegation executes before expiry",
  );

  console.log("");
  console.log("=== 103B - EXPIRED CAPABILITY ===");

  const expiredCapability =
    authority.issue(
      "trace103-parent",
      "trace103-child",
      {
        actions: [
          "tool.execute",
        ],
        tools: [
          "echo",
        ],
      },
      1,
      isRegistered,
    );

  await new Promise(
    resolve => setTimeout(resolve, 10),
  );

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          phase: "after-expiry",
        },
        {
          agentId: "trace103-child",
        },
        "trace103-parent",
        "trace103-child",
        expiredCapability.id,
        "echo",
      ),
    /expired/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: expired delegation is rejected before tool execution",
  );

  console.log("");
  console.log("=== 103C - EXPIRED CAPABILITY REMAINS NON-EXECUTABLE ===");

  assert.equal(
    authority.has(
      expiredCapability.id,
    ),
    true,
  );

  assert.throws(
    () =>
      authority.consume(
        expiredCapability.id,
        "trace103-parent",
        "trace103-child",
        "tool.execute",
        "echo",
      ),
    /expired/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: expired capability cannot be consumed directly",
  );

  console.log("");
  console.log("=== 103D - FINAL EXPIRY INVARIANT ===");

  assert.equal(
    executed,
    1,
  );

  assert.ok(
    Date.now() >=
      expiredCapability.expiresAt.getTime(),
  );

  console.log(
    "PASS: expiry cannot produce an additional tool execution",
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 103 COMPLETE");
  console.log("==================================================");

  console.log(
    "TRACE103: DELEGATION EXPIRY PASS",
  );
}

main().catch((error: unknown) => {
  console.error("");
  console.error("TRACE 103 FAILED");
  console.error(error);
  process.exitCode = 1;
});

