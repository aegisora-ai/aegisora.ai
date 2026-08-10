import assert from "node:assert/strict";

import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";
import { RuntimeContext } from "../src/context/runtime-context";
import { ProviderRouter } from "../src/providers/provider-router";
import type {
  BaseProvider,
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";

class TestProvider implements BaseProvider {
  public calls = 0;

  async generate(
    request: ProviderRequest,
    _context?: unknown
  ): Promise<ProviderResponse> {
    this.calls++;

    return {
      output: `TEST:${request.prompt}`,
      provider: "test",
      model: request.model ?? "test-model",
    };
  }
}

async function main() {
  console.log("[1] Creating runtime context...");

  const context = new RuntimeContext();

  const provider = new TestProvider();

  const router = new ProviderRouter();

  router.register("openai", provider as unknown as BaseProvider);

  const gateway = new ProviderExecutionGateway(
    context,
    router
  );

  console.log("[2] Testing ALLOW path...");

  const allowed = await gateway.generate({
    agentId: "gateway-test-agent",
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

  const model =
    gateway.getDefaultModel("openai");

  assert.ok(
    typeof model === "string",
    "Gateway must resolve a default model"
  );

  console.log("Default model resolution: PASS");

  console.log("[5] Testing provider registry...");

  assert.equal(
    gateway.has("openai"),
    true
  );

  assert.ok(
    gateway.list().includes("openai")
  );

  console.log("Provider registry: PASS");

  console.log("");
  console.log("PROVIDER GATEWAY TEST: PASS");
}

main().catch((error) => {
  console.error("");
  console.error("PROVIDER GATEWAY TEST: FAIL");
  console.error(error);
  process.exit(1);
});
