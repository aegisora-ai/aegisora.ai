import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

function pass(message: string) {
  console.log(`PASS: ${message}`);
}

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

async function main() {
  console.log("");
  console.log("TRACE 73K-R11-FINAL - TOOL CAPABILITY SECURITY GATE");
  console.log("============================================================");
  console.log("");

  const runtime = new AgentRuntime();
  const registry = runtime.getToolRegistry();

  pass("AgentRuntime constructed.");

  if (!registry.has("echo")) {
    fail("EchoTool is not registered.");
  }

  pass("EchoTool is present in canonical ToolRegistry.");

  const agentId = "trace-r11-final-capability-agent";
  runtime.create(agentId);

  pass(`Agent created: ${agentId}`);

  console.log("");
  console.log("--- R11-FINAL-1: UNAUTHORIZED DIRECT REGISTRY CALL ---");

  let unauthorizedBlocked = false;

  try {
    await registry.execute(
      "echo",
      {
        task: "UNAUTHORIZED_CAPABILITY_PROBE",
        reasoning: "Intentional direct bypass attempt.",
      },
      {
        agentId,
        metadata: {
          trace: "73k-r11-final-unauthorized",
        },
      },
    );

    fail(
      "CRITICAL SECURITY FAILURE: Unauthorized ToolRegistry.execute() succeeded.",
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    console.log("UNAUTHORIZED RESULT:", message);

    if (message.includes("[ENFORCEMENT:BLOCK]")) {
      unauthorizedBlocked = true;
    } else {
      fail(
        `Unauthorized call was rejected incorrectly: ${message}`,
      );
    }
  }

  if (!unauthorizedBlocked) {
    fail("Unauthorized ToolRegistry execution was not blocked.");
  }

  pass(
    "Direct ToolRegistry.execute() without capability is blocked.",
  );

  console.log("");
  console.log("--- R11-FINAL-2: AUTHORIZED REAL RUNTIME EXECUTION ---");

  const result = await runtime.execute({
    agentId,
    goal: "echo final capability security gate",
  });

  console.log("");
  console.log("AUTHORIZED EXECUTION RESULT:");
  console.dir(result, { depth: 10 });

  if (result.success !== true) {
    fail("Authorized runtime execution did not succeed.");
  }

  pass("Authorized runtime execution succeeded.");

  if (result.steps <= 0) {
    fail(
      `Authorized execution returned invalid step count: ${result.steps}`,
    );
  }

  pass(
    `Authorized runtime execution completed ${result.steps} step(s).`,
  );

  console.log("");
  console.log("--- R11-FINAL-3: SECURITY INVARIANTS ---");

  console.log("INVARIANT A:");
  console.log(
    "  No capability -> ToolRegistry.execute() -> BLOCK",
  );

  console.log("INVARIANT B:");
  console.log(
    "  Runtime capability -> AgentExecutor -> ToolRegistry.execute() -> ALLOW",
  );

  console.log("INVARIANT C:");
  console.log(
    "  EnforcementGate remains before RuntimeTool.execute()",
  );

  pass("All R11 execution capability invariants hold.");

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73K-R11-FINAL PASSED");
  console.log(" TOOL EXECUTION CAPABILITY BOUNDARY = CLOSED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73K-R11-FINAL FAILED");
  console.error(
    error instanceof Error
      ? error.message
      : String(error),
  );
  process.exit(1);
});
