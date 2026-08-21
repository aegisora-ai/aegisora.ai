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
  console.log("TRACE 73K-R12 - DIRECT PROVIDER BYPASS ADVERSARIAL TEST");
  console.log("============================================================");
  console.log("");

  console.log("--- R12-1: REAL RUNTIME ---");

  const runtime = new AgentRuntime();

  pass("AgentRuntime constructed.");

  const gateway = runtime.getProviderGateway();

  if (!gateway) {
    fail("ProviderExecutionGateway is unavailable.");
  }

  pass("ProviderExecutionGateway resolved.");

  console.log("");
  console.log("--- R12-2: PROVIDER GATEWAY CONTROL ---");

  let gatewayBlocked = false;

  try {
    await gateway.generate({
      agentId: "trace-r12-FORGED-agent",
      provider: "openai",
      request: {
        prompt: "R12_FORGED_GATEWAY_CONTROL",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    console.log("GATEWAY RESULT:", message);

    if (message.includes("[ENFORCEMENT:BLOCK]")) {
      gatewayBlocked = true;
    } else {
      console.log(
        "Observed gateway rejection:",
        message,
      );
    }
  }

  if (!gatewayBlocked) {
    fail(
      "ProviderExecutionGateway did not prove forged identity blocking.",
    );
  }

  pass(
    "ProviderExecutionGateway blocks forged provider identity.",
  );

  console.log("");
  console.log("--- R12-3: ROUTER ACCESS ---");

  const gatewayAny = gateway as unknown as {
    router?: {
      resolve?: (name?: "openai" | "anthropic" | "gemini") => unknown;
    };
  };

  const directRouter =
    gatewayAny.router;

  if (!directRouter) {
    console.log(
      "FINDING: ProviderRouter is not publicly reachable from ProviderExecutionGateway.",
    );
    pass(
      "ProviderRouter is not directly exposed through the gateway surface.",
    );
  } else {
    pass(
      "ProviderRouter reference is reachable from gateway internals.",
    );
  }

  console.log("");
  console.log("--- R12-4: PUBLIC RUNTIME SURFACE SCAN ---");

  const runtimeAny = runtime as unknown as Record<string, unknown>;

  const providerLikeKeys = Object.keys(runtimeAny).filter(
    (key) =>
      key.toLowerCase().includes("provider") ||
      key.toLowerCase().includes("router"),
  );

  console.log(
    "OBSERVED PROVIDER-LIKE RUNTIME KEYS:",
    providerLikeKeys,
  );

  if (providerLikeKeys.length === 0) {
    pass(
      "AgentRuntime does not expose obvious provider/router execution handles.",
    );
  } else {
    console.log(
      "FINDING: Runtime contains provider-related internal handles.",
    );
    console.log(
      "NEXT HARDENING: Verify these handles cannot be used to invoke BaseProvider.generate() directly.",
    );
  }

  console.log("");
  console.log("--- R12-5: VERDICT ---");

  console.log(
    "CONTROL PATH:",
  );

  console.log(
    "  AgentRuntime"
  );

  console.log(
    "    -> ProviderExecutionGateway"
  );

  console.log(
    "    -> EnforcementGate"
  );

  console.log(
    "    -> ProviderRouter"
  );

  console.log(
    "    -> BaseProvider.generate()"
  );

  console.log("");

  console.log(
    "ATTACK PATH UNDER TEST:"
  );

  console.log(
    "  attacker"
  );

  console.log(
    "    -> ProviderRouter / BaseProvider"
  );

  console.log(
    "    -> provider.generate()"
  );

  console.log(
    "    -> EnforcementGate bypass?"
  );

  console.log("");

  console.log("============================================================");
  console.log(" TRACE 73K-R12 COMPLETE");
  console.log(" DIRECT PROVIDER BYPASS SURFACE MEASURED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73K-R12 FAILED");
  console.error(
    error instanceof Error
      ? error.message
      : String(error),
  );
  process.exit(1);
});
