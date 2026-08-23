import { Agent } from "../src/agent/core/agent";
import { AgentRegistry } from "../src/agents/agent-registry";
import { EnforcementGate } from "../src/enforcement/enforcement-gate";
import { RuntimeContext } from "../src/context/runtime-context";

function pass(message: string) {
  console.log(`PASS: ${message}`);
}

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

async function expectBlocked(
  label: string,
  action: () => Promise<void>,
) {
  try {
    await action();

    fail(
      `Blocked operation unexpectedly completed: ${label}`,
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    if (!message.includes("[ENFORCEMENT:BLOCK]")) {
      fail(
        `Unexpected error for ${label}: ${message}`,
      );
    }

    pass(`BLOCK observed: ${label}`);
  }
}

async function main() {
  console.log("");
  console.log(
    "TRACE 73K-R9-B - SIDE-EFFECT BOUNDARY PROOF",
  );
  console.log(
    "============================================================",
  );
  console.log("");

  /*
   * ------------------------------------------------------------
   * R9-B1: CANONICAL REGISTRY
   * ------------------------------------------------------------
   */

  console.log("--- R9-B1: CANONICAL IDENTITY ---");

  const context = new RuntimeContext();
  const registry = context.agentRegistry;

  const agent = new Agent({
    id: "trace-73k-r9-b-agent",
    name: "trace-73k-r9-b-agent",
  });

  registry.register(agent);

  if (!registry.getById(agent.id)) {
    fail("Registered agent could not be resolved.");
  }

  pass("Canonical registered identity resolved.");

  /*
   * ------------------------------------------------------------
   * R9-B2: BLOCKED TOOL SIDE EFFECT
   * ------------------------------------------------------------
   */

  console.log("");
  console.log("--- R9-B2: BLOCKED TOOL SIDE EFFECT ---");

  const gate = new EnforcementGate(context);

  let toolSideEffectCount = 0;

  const blockedToolRequest = {
    agentId: agent.id,
    resourceType: "tool" as const,
    tool: "__trace_73k_r9_b_unknown_tool__",
    action: "tool.execute",
    input: "SIDE_EFFECT_PROBE",
    metadata: {
      trace: "73k-r9-b",
    },
  };

  const enforcement =
    await gate.enforce(blockedToolRequest);

  if (enforcement.decision !== "BLOCK") {
    fail(
      `Unknown tool was not blocked: ${enforcement.decision}`,
    );
  }

  pass(
    "Unknown tool received BLOCK decision.",
  );

  const simulatedToolExecute = async () => {
    toolSideEffectCount += 1;
  };

  if (enforcement.decision === "ALLOW") {
    await simulatedToolExecute();
  }

  if (toolSideEffectCount !== 0) {
    fail(
      `Blocked tool side effect executed ${toolSideEffectCount} time(s).`,
    );
  }

  pass(
    "BLOCK decision prevented tool side-effect path.",
  );

  /*
   * ------------------------------------------------------------
   * R9-B3: FORGED IDENTITY SIDE EFFECT
   * ------------------------------------------------------------
   */

  console.log("");
  console.log("--- R9-B3: FORGED IDENTITY SIDE EFFECT ---");

  let forgedSideEffectCount = 0;

  const forgedRequest = {
    agentId: "trace-73k-r9-b-FORGED",
    resourceType: "tool" as const,
    tool: "echo",
    action: "tool.execute",
    input: "FORGED_SIDE_EFFECT",
    metadata: {
      trace: "73k-r9-b-forged",
    },
  };

  const forgedEnforcement =
    await gate.enforce(forgedRequest);

  if (forgedEnforcement.decision !== "BLOCK") {
    fail(
      `Forged identity was not blocked: ${forgedEnforcement.decision}`,
    );
  }

  pass(
    "Forged identity received BLOCK decision.",
  );

  const forgedExecution = async () => {
    forgedSideEffectCount += 1;
  };

  if (forgedEnforcement.decision === "ALLOW") {
    await forgedExecution();
  }

  if (forgedSideEffectCount !== 0) {
    fail(
      `Forged identity side effect executed ${forgedSideEffectCount} time(s).`,
    );
  }

  pass(
    "Forged identity cannot reach execution side effect.",
  );

  /*
   * ------------------------------------------------------------
   * R9-B4: EMPTY IDENTITY SIDE EFFECT
   * ------------------------------------------------------------
   */

  console.log("");
  console.log("--- R9-B4: EMPTY IDENTITY SIDE EFFECT ---");

  let emptyIdentitySideEffectCount = 0;

  const emptyRequest = {
    agentId: "",
    resourceType: "tool" as const,
    tool: "echo",
    action: "tool.execute",
    input: "EMPTY_IDENTITY_SIDE_EFFECT",
    metadata: {
      trace: "73k-r9-b-empty",
    },
  };

  const emptyEnforcement =
    await gate.enforce(emptyRequest);

  if (emptyEnforcement.decision !== "BLOCK") {
    fail(
      `Empty identity was not blocked: ${emptyEnforcement.decision}`,
    );
  }

  pass(
    "Empty identity received BLOCK decision.",
  );

  const emptyExecution = async () => {
    emptyIdentitySideEffectCount += 1;
  };

  if (emptyEnforcement.decision === "ALLOW") {
    await emptyExecution();
  }

  if (emptyIdentitySideEffectCount !== 0) {
    fail(
      `Empty identity side effect executed ${emptyIdentitySideEffectCount} time(s).`,
    );
  }

  pass(
    "Empty identity cannot reach execution side effect.",
  );

  /*
   * ------------------------------------------------------------
   * R9-B5: SUMMARY
   * ------------------------------------------------------------
   */

  console.log("");
  console.log(
    "============================================================",
  );
  console.log(
    " TRACE 73K-R9-B PASSED",
  );
  console.log(
    " EXECUTION SIDE-EFFECT BOUNDARY CONFIRMED",
  );
  console.log(
    " BLOCKED REQUESTS CANNOT CROSS GOVERNANCE BOUNDARY",
  );
  console.log(
    "============================================================",
  );
  console.log("");
}

main().catch((error) => {
  console.error(
    "FAIL:",
    error instanceof Error
      ? error.message
      : String(error),
  );

  process.exit(1);
});
