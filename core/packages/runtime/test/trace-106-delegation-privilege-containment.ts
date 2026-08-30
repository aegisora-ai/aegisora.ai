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
  console.log(" TRACE 106 - DELEGATION PRIVILEGE CONTAINMENT");
  console.log("==================================================");

  const context =
    new RuntimeContext();

  for (const agentId of [
    "trace106-parent",
    "trace106-child",
    "trace106-grandchild",
    "trace106-attacker",
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
      Symbol("trace106-execution"),
    );

  registry.setEnforcementGate(gate);
  registry.setDelegationAuthority(authority);

  let echoExecuted = 0;
  let adminExecuted = 0;

  registry.register({
    name: "echo",
    description: "Trace 106 permitted tool",
    async execute(input) {
      echoExecuted++;
      return input;
    },
  });

  registry.register({
    name: "admin",
    description: "Trace 106 privileged tool",
    async execute(input) {
      adminExecuted++;
      return input;
    },
  });

  console.log("");
  console.log("=== 106A - PARENT GRANTS NARROW CHILD AUTHORITY ===");

  const parentCapability =
    authority.issue(
      "trace106-parent",
      "trace106-child",
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

  await registry.executeDelegated(
    "echo",
    {
      phase: "parent-to-child",
    },
    {
      agentId: "trace106-child",
    },
    "trace106-parent",
    "trace106-child",
    parentCapability.id,
    "echo",
  );

  assert.equal(
    echoExecuted,
    1,
  );

  assert.equal(
    adminExecuted,
    0,
  );

  console.log(
    "PASS: child received only the explicitly delegated tool",
  );

  console.log("");
  console.log("=== 106B - CHILD CANNOT USE AUTHORITY AS PARENT ===");

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          phase: "child-forged-parent",
        },
        {
          agentId: "trace106-child",
        },
        "trace106-child",
        "trace106-child",
        parentCapability.id,
        "echo",
      ),
    /parent identity mismatch|already consumed/,
  );

  assert.equal(
    echoExecuted,
    1,
  );

  console.log(
    "PASS: child cannot reinterpret parent capability as child-issued authority",
  );

  console.log("");
  console.log("=== 106C - CHILD CANNOT ESCALATE TOOL SCOPE ===");

  const narrowCapability =
    authority.issue(
      "trace106-parent",
      "trace106-child",
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
        "admin",
        {
          phase: "child-tool-escalation",
        },
        {
          agentId: "trace106-child",
        },
        "trace106-parent",
        "trace106-child",
        narrowCapability.id,
        "admin",
      ),
    /Delegated tool not permitted/,
  );

  assert.equal(
    echoExecuted,
    1,
  );

  assert.equal(
    adminExecuted,
    0,
  );

  console.log(
    "PASS: child cannot escalate delegated tool scope",
  );

  console.log("");
  console.log("=== 106D - GRANDCHILD CANNOT REUSE CHILD CAPABILITY ===");

  await assert.rejects(
    () =>
      registry.executeDelegated(
        "echo",
        {
          phase: "grandchild-reuse",
        },
        {
          agentId: "trace106-grandchild",
        },
        "trace106-parent",
        "trace106-child",
        narrowCapability.id,
        "echo",
      ),
    /child identity does not match|Delegated child identity mismatch/,
  );

  assert.equal(
    echoExecuted,
    1,
  );

  console.log(
    "PASS: grandchild cannot reuse capability issued to child",
  );

  console.log("");
  console.log("=== 106E - ATTACKER CANNOT CROSS CHILD BOUNDARY ===");

  const attackerCapability =
    authority.issue(
      "trace106-parent",
      "trace106-child",
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
          phase: "attacker-reuse",
        },
        {
          agentId: "trace106-attacker",
        },
        "trace106-parent",
        "trace106-child",
        attackerCapability.id,
        "echo",
      ),
    /child identity does not match|Delegated child identity mismatch/,
  );

  assert.equal(
    echoExecuted,
    1,
  );

  assert.equal(
    adminExecuted,
    0,
  );

  console.log(
    "PASS: attacker cannot cross delegated child boundary",
  );

  console.log("");
  console.log("=== 106F - CHILD CAPABILITY CANNOT BECOME PROVIDER AUTHORITY ===");

  const toolOnly =
    authority.issue(
      "trace106-parent",
      "trace106-child",
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
        toolOnly.id,
        "trace106-parent",
        "trace106-child",
        "provider.generate",
        "openai",
      ),
    /Delegated action not permitted/,
  );

  assert.equal(
    echoExecuted,
    1,
  );

  assert.equal(
    adminExecuted,
    0,
  );

  console.log(
    "PASS: tool-only delegation cannot become provider authority",
  );

  console.log("");
  console.log("=== 106G - FINAL PRIVILEGE CONTAINMENT INVARIANT ===");

  assert.equal(
    echoExecuted,
    1,
  );

  assert.equal(
    adminExecuted,
    0,
  );

  console.log(
    "PASS: exactly one authorized tool execution occurred",
  );

  console.log(
    "PASS: child privilege remained bounded",
  );

  console.log(
    "PASS: grandchild privilege remained bounded",
  );

  console.log(
    "PASS: attacker privilege remained bounded",
  );

  console.log(
    "PASS: no delegated capability crossed its identity or action boundary",
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 106 COMPLETE");
  console.log("==================================================");

  console.log(
    "TRACE106: DELEGATION PRIVILEGE CONTAINMENT PASS",
  );
}

main().catch((error: unknown) => {
  console.error("");
  console.error("TRACE 106 FAILED");
  console.error(error);
  process.exitCode = 1;
});
