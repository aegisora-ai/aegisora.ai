import assert from "node:assert/strict";

import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";
import { RuntimeContext } from "../src/context/runtime-context";
import { Agent } from "../src/agent/core/agent";
import { ProviderRouter } from "../src/providers/provider-router";
import { BaseProvider } from "../src/providers/base-provider";
import type {
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";

class CountingProvider extends BaseProvider {
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

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 53 - PROVIDER ENFORCEMENT BOUNDARY");
  console.log("==================================================");

  const context = new RuntimeContext();

  const agentId =
    "trace53-agent";

  context.agentRegistry.register(
    new Agent({
      id: agentId,
      name: agentId,
    }),
  );

  const provider = new CountingProvider();

  const router = new ProviderRouter();

  router.register(
    "openai",
    provider
  );

  const gateway =
    new ProviderExecutionGateway(
      context,
      router
    );

  console.log("");
  console.log("=== 53A - ALLOW PROVIDER ===");

  const allowed =
    await gateway.generate({
      agentId: agentId,
      provider: "openai",
      request: {
        prompt: "safe provider request",
      },
    });

  console.log(
    "Provider calls:",
    provider.calls
  );

  assert.equal(
    provider.calls,
    1,
    "Allowed provider must execute exactly once"
  );

  assert.equal(
    allowed.output,
    "TEST:safe provider request"
  );

  console.log(
    "PASS: allowed provider reached execution"
  );

  console.log("");
  console.log("=== 53B - UNKNOWN PROVIDER MUST BE BLOCKED ===");

  let blocked = false;

  try {

    await gateway.generate({
      agentId: agentId,
      provider: "unknown" as any,
      request: {
        prompt: "this must never reach provider",
      },
    });

  } catch (error) {

    blocked = true;

    console.log(
      "Blocked error:",
      error instanceof Error
        ? error.message
        : error
    );
  }

  assert.equal(
    blocked,
    true,
    "Unknown provider must be rejected"
  );

  assert.equal(
    provider.calls,
    1,
    "Blocked provider must not invoke provider.generate()"
  );

  console.log(
    "PASS: unknown provider blocked before execution"
  );

  console.log("");
  console.log("=== 53C - FINAL PROVIDER CALL COUNT ===");

  console.log(
    "Provider calls:",
    provider.calls
  );

  assert.equal(
    provider.calls,
    1
  );

  console.log(
    "PASS: provider execution boundary preserved"
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 53 COMPLETE - ALL ASSERTIONS PASSED");
  console.log("==================================================");
}

main().catch(error => {

  console.error("");
  console.error(
    "=================================================="
  );
  console.error(
    " TRACE 53 FAILED"
  );
  console.error(
    "=================================================="
  );

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
