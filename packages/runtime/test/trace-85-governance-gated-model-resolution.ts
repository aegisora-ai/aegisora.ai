import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";
import { ProviderRouter } from "../src/providers/provider-router";
import { BaseProvider } from "../src/providers/base-provider";
import { ProviderManager } from "../src/providers/provider-manager";

import type {
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";

class Trace85Provider extends BaseProvider {

  public readonly name = "trace85-provider";

  public calls = 0;

  async generate(
    request: ProviderRequest,
    _context: unknown
  ): Promise<ProviderResponse> {

    this.calls++;

    return this.buildResponse(
      "trace85-provider",
      request.model,
      `TRACE85:${request.prompt}`
    );
  }
}

class Trace85Manager extends ProviderManager {

  public defaultModelCalls = 0;

  override getDefaultModel(
    provider: any
  ): string {

    this.defaultModelCalls++;

    return super.getDefaultModel(provider);
  }
}

async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 85 - GOVERNANCE-GATED MODEL RESOLUTION");
  console.log("==================================================");

  const context =
    new RuntimeContext();

  const agentId =
    "trace85-agent";

  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });

  const provider =
    new Trace85Provider();

  const router =
    new ProviderRouter();

  router.register(
    "openai",
    provider
  );

  const manager =
    new Trace85Manager(router);

  const gateway =
    new ProviderExecutionGateway(
      context,
      router,
      manager
    );

  /*
   * ----------------------------------------------------------
   * 85A - ALLOW
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 85A - ALLOW ===");

  const allowed =
    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {
        prompt:
          "TRACE 85 allow model resolution",
      },

      metadata: {
        trace:
          "85A",
      },
    });

  console.log(
    "Output:",
    allowed.output
  );

  console.log(
    "Provider calls:",
    provider.calls
  );

  console.log(
    "getDefaultModel calls:",
    manager.defaultModelCalls
  );

  assert.equal(
    provider.calls,
    1,
    "ALLOW must invoke provider exactly once"
  );

  assert.equal(
    manager.defaultModelCalls,
    1,
    "ALLOW must resolve default model exactly once"
  );

  console.log(
    "PASS: ALLOW -> default model resolution -> provider"
  );

  /*
   * ----------------------------------------------------------
   * 85B - UNKNOWN PROVIDER / BLOCK
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 85B - BLOCK ===");

  try {

    await gateway.generate({

      agentId,

      provider:
        "unknown" as any,

      request: {
        prompt:
          "TRACE 85 blocked request",
      },

      metadata: {
        trace:
          "85B",
      },
    });

    assert.fail(
      "Unknown provider should have been blocked"
    );

  } catch (error) {

    console.log(
      "Blocked:",
      error instanceof Error
        ? error.message
        : error
    );
  }

  console.log(
    "Provider calls:",
    provider.calls
  );

  console.log(
    "getDefaultModel calls:",
    manager.defaultModelCalls
  );

  assert.equal(
    provider.calls,
    1,
    "BLOCK must not invoke provider"
  );

  assert.equal(
    manager.defaultModelCalls,
    1,
    "BLOCK must not resolve default model"
  );

  console.log(
    "PASS: BLOCK -> zero additional model resolution"
  );

  /*
   * ----------------------------------------------------------
   * 85C - ESCALATE
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 85C - ESCALATE ===");

  try {

    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {
        prompt:
          "TRACE 85 escalation request",
      },

      metadata: {
        trace:
          "85C",

        requiresReview:
          true,
      },
    });

    assert.fail(
      "Review-required request should have escalated"
    );

  } catch (error) {

    console.log(
      "Escalated:",
      error instanceof Error
        ? error.message
        : error
    );
  }

  console.log(
    "Provider calls:",
    provider.calls
  );

  console.log(
    "getDefaultModel calls:",
    manager.defaultModelCalls
  );

  assert.equal(
    provider.calls,
    1,
    "ESCALATE must not invoke provider"
  );

  assert.equal(
    manager.defaultModelCalls,
    1,
    "ESCALATE must not resolve default model"
  );

  console.log(
    "PASS: ESCALATE -> zero additional model resolution"
  );

  /*
   * ----------------------------------------------------------
   * 85D - FINAL INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 85D - FINAL INVARIANT ===");

  console.log(
    "Provider calls:",
    provider.calls
  );

  console.log(
    "getDefaultModel calls:",
    manager.defaultModelCalls
  );

  assert.equal(
    provider.calls,
    1
  );

  assert.equal(
    manager.defaultModelCalls,
    1
  );

  console.log("");
  console.log(
    "PASS: ALLOW    -> 1 model resolution"
  );

  console.log(
    "PASS: BLOCK    -> 0 model resolution"
  );

  console.log(
    "PASS: ESCALATE -> 0 model resolution"
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 85 COMPLETE");
  console.log("==================================================");
}

main().catch((error) => {

  console.error("");
  console.error("TRACE 85 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
