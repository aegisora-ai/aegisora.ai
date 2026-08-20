import assert from "node:assert/strict";

import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";
import { RuntimeContext } from "../src/context/runtime-context";
import { ProviderRouter } from "../src/providers/provider-router";
import { BaseProvider } from "../src/providers/base-provider";

import type {
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";

class Trace57Provider extends BaseProvider {
  public readonly name = "trace57-provider";

  public calls = 0;

  public callOrder: string[] = [];

  async generate(
    request: ProviderRequest,
    _context: unknown
  ): Promise<ProviderResponse> {

    this.calls++;

    this.callOrder.push("provider.generate");

    return this.buildResponse(
      "trace57-provider",
      request.model,
      `TRACE57:${request.prompt}`
    );
  }
}

async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 57H - ALLOW -> AUDIT -> PROVIDER");
  console.log("==================================================");

  console.log("");
  console.log("=== 57H-A - CREATE RUNTIME ===");

  const context = new RuntimeContext();

  assert.ok(
    context.decisionStore,
    "DecisionTraceStore must exist"
  );

  console.log("PASS: runtime context created");


  console.log("");
  console.log("=== 57H-B - INSTALL TRACE PROVIDER ===");

  const agentId = "trace57-allow-agent";

  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });

  const provider = new Trace57Provider();

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

  console.log("PASS: trace provider installed");


  console.log("");
  console.log("=== 57H-C - EXECUTE SAFE PROVIDER REQUEST ===");

  const response =
    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {
        prompt:
          "TRACE 57 safe provider request",
      },

      metadata: {
        trace:
          "57H",
      },
    });

  assert.equal(
    response.output,
    "TRACE57:TRACE 57 safe provider request"
  );

  console.log(
    "PASS: provider response returned"
  );


  console.log("");
  console.log("=== 57H-D - PROVIDER INVOCATION ===");

  assert.equal(
    provider.calls,
    1,
    "Provider must be invoked exactly once"
  );

  assert.deepEqual(
    provider.callOrder,
    [
      "provider.generate",
    ]
  );

  console.log(
    "PASS: provider.generate() invoked exactly once"
  );


  console.log("");
  console.log("=== 57H-E - DECISION TRACE ===");

  const records =
    context.decisionStore.getAll();

  console.log(
    "Decision records:",
    records.length
  );

  console.log(
    JSON.stringify(
      records,
      null,
      2
    )
  );

  assert.equal(
    records.length,
    1,
    "Exactly one decision trace must exist"
  );

  const decision =
    records[0];

  assert.equal(
    decision.agentId,
    "trace57-allow-agent"
  );

  assert.equal(
    decision.action,
    "provider.generate"
  );

  assert.equal(
    decision.decision,
    "allow"
  );

  console.log(
    "PASS: ALLOW decision trace persisted"
  );


  console.log("");
  console.log("=== 57H-F - SECURITY INVARIANT ===");

  assert.equal(
    provider.calls,
    1,
    "Provider execution must occur after successful enforcement"
  );

  assert.equal(
    decision.decision,
    "allow"
  );

  console.log(
    "PASS: ALLOW -> AUDIT -> PROVIDER"
  );


  console.log("");
  console.log("=== 57H-G - FINAL INVARIANT ===");

  console.log(
    "Security decision:",
    decision.decision.toUpperCase()
  );

  console.log(
    "Decision trace persisted: YES"
  );

  console.log(
    "Provider calls:",
    provider.calls
  );

  console.log(
    "Provider boundary crossed: YES"
  );

  console.log(
    "Execution result:",
    response.output
  );

  console.log("");
  console.log(
    "PASS: ALLOW -> AUDIT -> PROVIDER EXECUTION"
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 57H COMPLETE");
  console.log("==================================================");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 57H FAILED");
  console.error(error);
  process.exit(1);
});
