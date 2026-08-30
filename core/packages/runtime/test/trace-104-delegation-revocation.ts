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
  console.log(" TRACE 104 - DELEGATION REVOCATION");
  console.log("==================================================");

  const context =
    new RuntimeContext();

  for (const agentId of [
    "trace104-parent",
    "trace104-child",
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
      Symbol("trace104-execution"),
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
    description: "Trace 104 echo tool",
    async execute(input) {
      executed++;
      return input;
    },
  });

  console.log("");
  console.log("=== 104A - ISSUE CAPABILITY ===");

  const capability =
    authority.issue(
      "trace104-parent",
      "trace104-child",
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
    authority.has(capability.id),
    true,
  );

  console.log(
    "PASS: delegation capability is registered",
  );

  console.log("");
  console.log("=== 104B - VALID EXECUTION BEFORE REVOKE ===");

  const result =
    await registry.executeDelegated(
      "echo",
      {
        phase: "before-revoke",
      },
      {
        agentId: "trace104-child",
      },
      "trace104-parent",
      "trace104-child",
      capability.id,
      "echo",
    );

  assert.deepEqual(
    result,
    {
      phase: "before-revoke",
    },
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: delegated capability executes before revocation",
  );

  console.log("");
  console.log("=== 104C - ISSUE SECOND CAPABILITY FOR REVOCATION ===");

  const revokedCapability =
    authority.issue(
      "trace104-parent",
      "trace104-child",
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
    authority.has(revokedCapability.id),
    true,
  );

  const revoked =
    authority.revoke(
      revokedCapability.id,
    );

  assert.equal(
    revoked,
    true,
  );

  assert.equal(
    authority.has(revokedCapability.id),
    false,
  );

  console.log(
    "PASS: capability revocation removes capability from authority",
  );

  console.log("");
  console.log("=== 104D - REVOKED CAPABILITY CANNOT EXECUTE ===");

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          phase: "after-revoke",
        },
        {
          agentId: "trace104-child",
        },
        "trace104-parent",
        "trace104-child",
        revokedCapability.id,
        "echo",
      ),
    /Unknown delegation capability/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: revoked capability is rejected before tool execution",
  );

  console.log("");
  console.log("=== 104E - DIRECT CONSUME OF REVOKED CAPABILITY ===");

  assert.throws(
    () =>
      authority.consume(
        revokedCapability.id,
        "trace104-parent",
        "trace104-child",
        "tool.execute",
        "echo",
      ),
    /Unknown delegation capability/,
  );

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: revoked capability cannot be consumed directly",
  );

  console.log("");
  console.log("=== 104F - DOUBLE REVOKE ===");

  assert.equal(
    authority.revoke(
      revokedCapability.id,
    ),
    false,
  );

  assert.equal(
    authority.has(revokedCapability.id),
    false,
  );

  console.log(
    "PASS: repeated revocation is idempotently non-successful",
  );

  console.log("");
  console.log("=== 104G - FINAL REVOCATION INVARIANT ===");

  assert.equal(
    executed,
    1,
  );

  console.log(
    "PASS: revocation produced zero additional tool execution",
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 104 COMPLETE");
  console.log("==================================================");

  console.log(
    "TRACE104: DELEGATION REVOCATION PASS",
  );
}

main().catch((error: unknown) => {
  console.error("");
  console.error("TRACE 104 FAILED");
  console.error(error);
  process.exitCode = 1;
});
