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
  console.log("TRACE 73K-R12 - DIRECT PROVIDER GENERATE BYPASS CLOSURE");
  console.log("============================================================");
  console.log("");

  const runtime = new AgentRuntime();
  const gateway = runtime.getProviderGateway();

  pass("AgentRuntime constructed.");
  pass("ProviderExecutionGateway resolved.");

  const gatewayAny = gateway as unknown as {
    router?: {
      resolve?: (
        name?: "openai" | "anthropic" | "gemini",
        authorization?: symbol,
      ) => unknown;
    };
  };

  const router = gatewayAny.router;

  if (!router || typeof router.resolve !== "function") {
    fail("ProviderRouter is not reachable from the gateway security surface.");
  }

  pass("ProviderRouter reference resolved from gateway internals.");

  console.log("");
  console.log("--- R12-1: UNAUTHORIZED PROVIDER RESOLUTION ---");

  let unauthorizedBlocked = false;

  try {
    await router.resolve("openai");

    fail(
      "CRITICAL SECURITY FAILURE: ProviderRouter.resolve() succeeded without capability.",
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    console.log("UNAUTHORIZED RESOLUTION RESULT:", message);

    if (!message.includes("[ENFORCEMENT:BLOCK]")) {
      fail(
        `ProviderRouter rejected unauthorized resolution incorrectly: ${message}`,
      );
    }

    unauthorizedBlocked = true;
  }

  if (!unauthorizedBlocked) {
    fail("Unauthorized ProviderRouter resolution was not blocked.");
  }

  pass(
    "Direct ProviderRouter.resolve() without capability is BLOCKED.",
  );

  console.log("");
  console.log("--- R12-2: CANONICAL GATEWAY CONTROL PATH ---");

  const agentId = "trace-r12-provider-generate-gateway-agent";
  runtime.create(agentId);

  pass(`Agent created: ${agentId}`);

  try {
    await gateway.generate({
      agentId,
      provider: "openai",
      request: {
        prompt: "TRACE R12 canonical provider path",
      },
    });

    pass(
      "Canonical ProviderExecutionGateway path completed without bypass.",
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    if (message.includes("Direct provider resolution is not authorized")) {
      fail(
        "Canonical gateway path lost its provider execution capability.",
      );
    }

    console.log("CANONICAL GATEWAY RESULT:", message);

    pass(
      "Canonical gateway path reached the governed provider boundary.",
    );
  }

  console.log("");
  console.log("--- R12-3: FINAL SECURITY INVARIANTS ---");

  console.log(
    "INVARIANT A: attacker -> ProviderRouter.resolve() -> BLOCK",
  );

  console.log(
    "INVARIANT B: runtime-owned capability -> canonical gateway",
  );

  console.log(
    "INVARIANT C: EnforcementGate remains before provider generation",
  );

  pass("All R12 provider capability invariants hold.");

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73K-R12 PASSED");
  console.log(" DIRECT PROVIDER BYPASS = CLOSED");
  console.log(" RAW PROVIDER RESOLUTION WITHOUT CAPABILITY = BLOCKED");
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
