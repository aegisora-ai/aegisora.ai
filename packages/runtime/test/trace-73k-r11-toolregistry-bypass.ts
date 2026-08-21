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
  console.log("TRACE 73K-R11 - TOOLREGISTRY DIRECT BYPASS");
  console.log("============================================================");
  console.log("");

  console.log("--- R11-BYPASS-1: RUNTIME ---");

  const runtime = new AgentRuntime();

  pass("AgentRuntime constructed.");

  const registry = runtime.getToolRegistry();

  if (!registry.has("echo")) {
    fail("EchoTool is not registered.");
  }

  pass("EchoTool resolved from canonical ToolRegistry.");

  const agent = runtime.create(
    "trace-r11-registry-bypass-agent",
  );

  pass(`Agent created: ${agent.id}`);

  console.log("");
  console.log("--- R11-BYPASS-2: DIRECT ToolRegistry.execute() ---");

  let directResult: unknown = undefined;
  let directError: unknown = undefined;

  try {
    directResult = await registry.execute(
      "echo",
      {
        task: "DIRECT_TOOLREGISTRY_BYPASS_PROBE",
        reasoning:
          "This intentionally bypasses AgentExecutor and EnforcementGate.",
      },
      {
        agentId: "trace-r11-registry-bypass-agent",
        metadata: {
          trace: "73k-r11-registry-bypass",
        },
      },
    );
  } catch (error) {
    directError = error;
  }

  if (!directError) {
    console.log("");
    console.dir(directResult, { depth: 10 });
    fail(
      "CRITICAL SECURITY FAILURE: Direct ToolRegistry.execute() succeeded without authorization.",
    );
  }

  const directMessage =
    directError instanceof Error
      ? directError.message
      : String(directError);

  console.log("DIRECT EXECUTION REJECTED:", directMessage);

  if (!directMessage.includes("[ENFORCEMENT:BLOCK]")) {
    fail(
      `Direct execution was rejected, but not by the capability boundary: ${directMessage}`,
    );
  }

  pass(
    "Direct ToolRegistry.execute() is blocked without the private execution capability.",
  );

  console.log("DIRECT TOOLREGISTRY RESULT:");
  console.dir(directResult, { depth: 10 });

  if (directResult !== undefined) {
    console.log("");
    console.log(
      "FINDING: ToolRegistry.execute() is directly callable.",
    );
    console.log(
      "FINDING: Direct call reached RuntimeTool.execute().",
    );
    console.log(
      "SECURITY STATUS: GOVERNANCE BYPASS SURFACE CONFIRMED.",
    );
    console.log(
      "NEXT: Canonical execution API must own the enforcement boundary.",
    );
  }

  console.log("");
  console.log("--- R11-BYPASS-3: CONTROL PATH ---");

  let forgedBlocked = false;

  try {
    await runtime
      .getProviderGateway()
      .generate({
        agentId: "trace-r11-registry-FORGED",
        provider: "openai",
        request: {
          prompt: "CONTROL_PATH_PROBE",
        },
      });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    if (message.includes("[ENFORCEMENT:BLOCK]")) {
      forgedBlocked = true;
      pass(
        "Independent provider control path still blocks forged identity.",
      );
    }
  }

  if (!forgedBlocked) {
    fail(
      "Provider enforcement control path did not block forged identity.",
    );
  }

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73K-R11-BYPASS COMPLETE");
  console.log(" TOOLREGISTRY DIRECT BYPASS SURFACE MEASURED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73K-R11-BYPASS FAILED");
  console.error(
    error instanceof Error
      ? error.message
      : String(error),
  );
  process.exit(1);
});
