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
  console.log(" TRACE 105 - DELEGATION SCOPE ESCALATION");
  console.log("==================================================");

  const context = new RuntimeContext();

  for (const agentId of [
    "trace105-parent",
    "trace105-child",
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
      Symbol("trace105-execution"),
    );

  registry.setEnforcementGate(gate);
  registry.setDelegationAuthority(authority);

  let echoExecuted = 0;
  let adminExecuted = 0;

  registry.register({
    name: "echo",
    description: "Trace 105 permitted tool",
    async execute(input) {
      echoExecuted++;
      return input;
    },
  });

  registry.register({
    name: "admin",
    description: "Trace 105 restricted tool",
    async execute(input) {
      adminExecuted++;
      return input;
    },
  });

  console.log("");
  console.log("=== 105A - PERMITTED TOOL SCOPE ===");

  const capability =
    authority.issue(
      "trace105-parent",
      "trace105-child",
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

  const result =
    await registry.executeDelegated(
      "echo",
      {
        phase: "permitted",
      },
      {
        agentId: "trace105-child",
      },
      "trace105-parent",
      "trace105-child",
      capability.id,
      "echo",
    );

  assert.deepEqual(
    result,
    {
      phase: "permitted",
    },
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
    "PASS: delegated execution is permitted within exact tool scope",
  );

  console.log("");
  console.log("=== 105B - TOOL SCOPE ESCALATION ===");

  const restrictedTool =
    authority.issue(
      "trace105-parent",
      "trace105-child",
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
          phase: "tool-escalation",
        },
        {
          agentId: "trace105-child",
        },
        "trace105-parent",
        "trace105-child",
        restrictedTool.id,
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
    "PASS: undelegated tool cannot execute",
  );

  console.log("");
  console.log("=== 105C - ACTION SCOPE ESCALATION ===");

  const toolOnlyCapability =
    authority.issue(
      "trace105-parent",
      "trace105-child",
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
        toolOnlyCapability.id,
        "trace105-parent",
        "trace105-child",
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
    "PASS: unauthorized delegated action is rejected",
  );

  console.log("");
  console.log("=== 105D - PROVIDER SCOPE ESCALATION ===");

  const providerRestricted =
    authority.issue(
      "trace105-parent",
      "trace105-child",
      {
        actions: [
          "provider.generate",
        ],
        providers: [
          "openai",
        ],
      },
      10_000,
      isRegistered,
    );

  assert.throws(
    () =>
      authority.consume(
        providerRestricted.id,
        "trace105-parent",
        "trace105-child",
        "provider.generate",
        "anthropic",
      ),
    /Delegated provider not permitted/,
  );

  console.log(
    "PASS: undelegated provider cannot be consumed",
  );

  console.log("");
  console.log("=== 105E - PROVIDER RESOURCE OMISSION FAIL-CLOSED ===");

  const providerScoped =
    authority.issue(
      "trace105-parent",
      "trace105-child",
      {
        actions: [
          "provider.generate",
        ],
        providers: [
          "openai",
        ],
      },
      10_000,
      isRegistered,
    );

  assert.throws(
    () =>
      authority.consume(
        providerScoped.id,
        "trace105-parent",
        "trace105-child",
        "provider.generate",
      ),
    /Delegated provider resource is required/,
  );

  assert.equal(
    authority.has(providerScoped.id),
    true,
  );

  console.log(
    "PASS: scoped provider delegation fails closed when resource is omitted",
  );

  console.log("");
  console.log("=== 105F - TOOL RESOURCE OMISSION FAIL-CLOSED ===");

  const toolScoped =
    authority.issue(
      "trace105-parent",
      "trace105-child",
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
        toolScoped.id,
        "trace105-parent",
        "trace105-child",
        "tool.execute",
      ),
    /Delegated tool resource is required/,
  );

  assert.equal(
    authority.has(toolScoped.id),
    true,
  );

  console.log(
    "PASS: scoped tool delegation fails closed when resource is omitted",
  );

  console.log("");
  console.log("=== 105G - FAILED SCOPE CHECK DOES NOT CONSUME CAPABILITY ===");

  const retryable =
    authority.issue(
      "trace105-parent",
      "trace105-child",
      {
        actions: [
          "provider.generate",
        ],
        providers: [
          "openai",
        ],
      },
      10_000,
      isRegistered,
    );

  assert.throws(
    () =>
      authority.consume(
        retryable.id,
        "trace105-parent",
        "trace105-child",
        "provider.generate",
      ),
    /Delegated provider resource is required/,
  );

  assert.equal(
    authority.has(retryable.id),
    true,
  );

  const recovered =
    authority.consume(
      retryable.id,
      "trace105-parent",
      "trace105-child",
      "provider.generate",
      "openai",
    );

  assert.equal(
    recovered.id,
    retryable.id,
  );

  assert.equal(
    authority.has(retryable.id),
    true,
  );

  console.log(
    "PASS: failed scope validation does not consume capability; valid retry remains possible",
  );

  console.log("");
  console.log("=== 105H - FINAL SCOPE INVARIANT ===");

  assert.equal(
    echoExecuted,
    1,
  );

  assert.equal(
    adminExecuted,
    0,
  );

  console.log(
    "PASS: scope escalation produced zero unauthorized tool execution",
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 105 COMPLETE");
  console.log("==================================================");

  console.log(
    "TRACE105: DELEGATION SCOPE ESCALATION PASS",
  );
}

main().catch((error: unknown) => {
  console.error("");
  console.error("TRACE 105 FAILED");
  console.error(error);
  process.exitCode = 1;
});

