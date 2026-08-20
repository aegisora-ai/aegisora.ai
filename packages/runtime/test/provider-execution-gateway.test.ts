import assert from "node:assert/strict";

import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";
import { RuntimeContext } from "../src/context/runtime-context";
import { ProviderRouter } from "../src/providers/provider-router";
import { BaseProvider } from "../src/providers/base-provider";
import type {
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";

class TestProvider extends BaseProvider {
  public readonly name = "test";
  public calls = 0;

  async generate(
    request: ProviderRequest,
    _context?: unknown
  ): Promise<ProviderResponse> {
    this.calls++;

    return this.buildResponse(
      "test",
      request.model ?? "test-model",
      `TEST:${request.prompt}`
    );
  }
}

async function main() {
  console.log("[1] Creating runtime context...");

  const context = new RuntimeContext();
  const provider = new TestProvider();
  const router = new ProviderRouter();

  router.register("openai", provider);

  const gateway = new ProviderExecutionGateway(context, router);

  // TRACE 73K-R6:
  // Register the test identity in the same canonical AgentRegistry
  // used by EnforcementGate. The production security boundary must
  // remain strict; the test fixture must satisfy that contract.
  const testAgentId = "gateway-test-agent";

  context.agentRegistry.register({
    id: testAgentId,
    name: "Gateway Test Agent",
    status: "idle",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  assert.ok(
    context.agentRegistry.getById(testAgentId),
    "Test agent must exist in canonical AgentRegistry"
  );

  console.log("Canonical test identity registration: PASS");

  console.log("[2] Testing ALLOW path...");

  const allowed = await gateway.generate({
    agentId: testAgentId,
    provider: "openai",
    request: {
      prompt: "safe test prompt",
    },
  });

  assert.equal(
    provider.calls,
    1,
    "Provider must be invoked exactly once"
  );

  assert.equal(
    allowed.output,
    "TEST:safe test prompt"
  );

  console.log("ALLOW path: PASS");

  console.log("[3] Testing provider metadata...");

  assert.equal(
    allowed.provider,
    "test"
  );

  console.log("Provider metadata: PASS");

  console.log("[4] Testing default model resolution...");

  const model = gateway.getDefaultModel("openai");

  assert.equal(
    model,
    "gpt-4.1-mini"
  );

  console.log("Default model resolution: PASS");

  console.log("\nPROVIDER GATEWAY TEST: PASS");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
