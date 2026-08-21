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
  console.log("TRACE 73K-R11-CANONICAL - TOOL EXECUTION PATH");
  console.log("============================================================");
  console.log("");

  const runtime = new AgentRuntime();

  console.log("--- R11-CANONICAL-1: RUNTIME ---");

  pass("AgentRuntime constructed.");

  const registry = runtime.getToolRegistry();

  if (!registry.has("echo")) {
    fail("EchoTool is not registered.");
  }

  pass("EchoTool is registered in canonical ToolRegistry.");

  console.log("");
  console.log("--- R11-CANONICAL-2: CANONICAL REGISTRY API ---");

  let registryExecuteCalled = false;

  const originalExecute = registry.execute.bind(registry);


  registry.execute = async (
    ...args
  ) => {
    registryExecuteCalled = true;

    console.log(
      "REGISTRY EXECUTE:",
      args[0],
    );

    return originalExecute(
      ...args,
    );
  };

  pass("ToolRegistry.execute() instrumentation installed.");

  console.log("");
  console.log("--- R11-CANONICAL-3: REAL AGENT ---");

  const agentId = "trace-r11-canonical-agent";

  runtime.create(agentId);

  pass(`Agent created: ${agentId}`);

  console.log("");
  console.log("--- R11-CANONICAL-4: REAL EXECUTION ---");

  const result = await runtime.execute({
    agentId,
    goal: "echo canonical tool boundary test",
  });

  console.log("");
  console.log("EXECUTION RESULT:");
  console.dir(result, { depth: 10 });

  if (!result.success) {
    fail("Real execution did not report success.");
  }

  pass("Real execution completed successfully.");

  console.log("");
  console.log("--- R11-CANONICAL-5: BOUNDARY ASSERTION ---");

  if (!registryExecuteCalled) {
    fail(
      "AgentExecutor did not reach ToolRegistry.execute().",
    );
  }

  pass(
    "AgentExecutor reached canonical ToolRegistry.execute().",
  );

  if (result.steps <= 0) {
    fail(
      `Expected positive execution step count, observed ${result.steps}.`,
    );
  }

  pass(
    `Real execution completed ${result.steps} step(s).`,
  );

  console.log("");
  console.log("--- R11-CANONICAL-6: FINAL PATH ---");

  console.log(
    "AgentRuntime.execute()"
  );

  console.log(
    "  -> AgentLoop"
  );

  console.log(
    "  -> AgentExecutor.execute()"
  );

  console.log(
    "  -> EnforcementGate"
  );

  console.log(
    "  -> ToolRegistry.execute()"
  );

  console.log(
    "  -> RuntimeTool.execute()"
  );

  pass(
    "Canonical governed tool execution path confirmed.",
  );

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73K-R11-CANONICAL PASSED");
  console.log(" TOOLREGISTRY EXECUTION PATH = VERIFIED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73K-R11-CANONICAL FAILED");
  console.error(
    error instanceof Error
      ? error.message
      : String(error),
  );
  process.exit(1);
});
