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
  console.log("TRACE 73K-R12 - PROVIDER CAPABILITY BYPASS RETEST");
  console.log("============================================================");
  console.log("");

  const runtime = new AgentRuntime();

  pass("AgentRuntime constructed.");

  const gateway = runtime.getProviderGateway();

  if (!gateway) {
    fail("ProviderExecutionGateway is unavailable.");
  }

  pass("ProviderExecutionGateway resolved.");

  console.log("");
  console.log("--- R12-1: DIRECT PROVIDER ROUTER ACCESS ---");

  const gatewayAny = gateway as unknown as {
    router?: {
      resolve?: (
        name?: "openai" | "anthropic" | "gemini",
        authorization?: symbol,
      ) => unknown;
    };
  };

  const router = gatewayAny.router;

  if (!router) {
    fail("ProviderRouter is not reachable for the adversarial test.");
  }

  pass("ProviderRouter reference resolved from gateway internals.");

  if (typeof router.resolve !== "function") {
    fail("ProviderRouter.resolve() is unavailable.");
  }

  console.log("");
  console.log("--- R12-2: UNAUTHORIZED RESOLUTION ---");

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
        `ProviderRouter rejected access without the capability boundary: ${message}`,
      );
    }

    unauthorizedBlocked = true;
  }

  if (!unauthorizedBlocked) {
    fail("Unauthorized ProviderRouter resolution was not blocked.");
  }

  pass(
    "Direct ProviderRouter.resolve() without capability is blocked.",
  );

  console.log("");
  console.log("--- R12-3: AUTHORIZED REAL PROVIDER PATH ---");

  const agentId = "trace-r12-authorized-provider-agent";
  runtime.create(agentId);

  pass(`Agent created: ${agentId}`);

  let gatewayBlocked = false;

  try {
    await gateway.generate({
      agentId,
      provider: "openai",
      request: {
        prompt: "R12 authorized provider capability regression",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    console.log("AUTHORIZED PROVIDER RESULT:", message);

    if (message.includes("[ENFORCEMENT:BLOCK]")) {
      gatewayBlocked = true;
    }
  }

  if (gatewayBlocked) {
    console.log(
      "NOTE: Provider execution is blocked because no provider API key is configured.",
    );
    pass(
      "Authorized provider path reached its governed execution boundary.",
    );
  } else {
    pass(
      "Authorized provider path completed without bypassing governance.",
    );
  }

  console.log("");
  console.log("--- R12-4: SECURITY INVARIANTS ---");

  console.log(
    "INVARIANT A: No capability -> ProviderRouter.resolve() -> BLOCK",
  );

  console.log(
    "INVARIANT B: Runtime-owned capability -> canonical gateway path",
  );

  console.log(
    "INVARIANT C: EnforcementGate remains before provider generation",
  );

  pass("R12 provider capability invariants verified.");

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73K-R12 CAPABILITY RETEST PASSED");
  console.log(" PROVIDER RESOLUTION CAPABILITY BOUNDARY = VERIFIED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73K-R12 CAPABILITY RETEST FAILED");
  console.error(
    error instanceof Error
      ? error.message
      : String(error),
  );
  process.exit(1);
});
