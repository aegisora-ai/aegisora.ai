import { AgentRuntime } from "../src/agent/runtime/agent-runtime";
import { RuntimeTool } from "../src/tools";

function pass(message: string) {
  console.log(`PASS: ${message}`);
}

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

async function main() {
  console.log("");
  console.log("TRACE 73K-R11 - DIRECT TOOL BYPASS ADVERSARIAL TEST");
  console.log("============================================================");
  console.log("");

  const runtime = new AgentRuntime();

  const registry = runtime.getToolRegistry();

  const echo = registry.get("echo");

  if (!echo) {
    fail("EchoTool could not be resolved from ToolRegistry.");
  }

  pass("EchoTool resolved from canonical ToolRegistry.");

  const agent = runtime.create("trace-r11-bypass-agent");

  pass(`Agent created: ${agent.id}`);

  const context = {
    agentId: agent.id,
    metadata: {
      trace: "73k-r11-direct-bypass",
    },
  };

  let directExecutionResult: unknown;

  console.log("");
  console.log("--- R11-A: DIRECT TOOL EXECUTION ---");

  try {
    directExecutionResult = await echo.execute(
      {
        task: "DIRECT_BYPASS_PROBE",
        reasoning: "This call intentionally bypasses EnforcementGate.",
      },
      context,
    );

    console.log("DIRECT TOOL RESULT:");
    console.dir(directExecutionResult, { depth: 10 });

    pass("Direct RuntimeTool.execute() is callable.");
  } catch (error) {
    console.log(
      "Direct execution threw:",
      error instanceof Error ? error.message : String(error),
    );

    pass("Direct RuntimeTool.execute() rejected execution.");
  }

  console.log("");
  console.log("--- R11-B: ENFORCEMENT CONTROL ---");

  const gateway = runtime.getProviderGateway();

  if (!gateway) {
    fail("ProviderExecutionGateway unavailable.");
  }

  pass("Provider gateway resolved.");

  let forgedBlocked = false;

  try {
    await gateway.generate({
      agentId: "trace-r11-FORGED-agent",
      provider: "openai",
      request: {
        prompt: "FORGED_BYPASS_PROBE",
      },
    });

    console.log("OBSERVED: forged provider request was accepted.");
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    if (message.includes("[ENFORCEMENT:BLOCK]")) {
      forgedBlocked = true;
      pass("Forged provider request blocked by enforcement.");
    } else {
      console.log("Observed provider rejection:", message);
    }
  }

  if (!forgedBlocked) {
    fail("Forged provider path was not proven blocked.");
  }

  console.log("");
  console.log("--- R11-C: VERDICT ---");

  if (directExecutionResult !== undefined) {
    console.log(
      "FINDING: RuntimeTool.execute() can be invoked directly outside EnforcementGate.",
    );
    console.log(
      "SECURITY STATUS: EXECUTION CAPABILITY BYPASS SURFACE EXISTS.",
    );
    console.log(
      "NEXT HARDENING: Route tool execution through a canonical enforcement-aware executor boundary.",
    );
  } else {
    pass(
      "No direct tool execution result escaped the security boundary.",
    );
  }

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73K-R11 COMPLETE");
  console.log(" DIRECT TOOL BYPASS SURFACE MEASURED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73K-R11 FAILED");
  console.error(error);
  process.exit(1);
});
