import assert from "node:assert/strict";

import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";
import { RuntimeContext } from "../src/context/runtime-context";
import { ProviderRouter } from "../src/providers/provider-router";
import { BaseProvider } from "../src/providers/base-provider";

import type {
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";


class Trace58Provider extends BaseProvider {

  public readonly name = "trace58-provider";

  public calls = 0;

  async generate(
    request: ProviderRequest,
    _context: unknown
  ): Promise<ProviderResponse> {

    this.calls++;

    return this.buildResponse(
      "trace58-provider",
      request.model,
      `TRACE58:${request.prompt}`
    );
  }
}


async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 58H - ESCALATE -> AUDIT -> NO PROVIDER");
  console.log("==================================================");


  console.log("");
  console.log("=== 58H-A - CREATE RUNTIME ===");

  const context = new RuntimeContext();

  assert.ok(
    context.decisionStore,
    "DecisionTraceStore must exist"
  );

  console.log(
    "PASS: runtime context created"
  );


  console.log("");
  console.log("=== 58H-B - INSTALL TRACE PROVIDER ===");

  const agentId = "trace58-escalate-agent";

  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });

  const provider = new Trace58Provider();

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

  console.log(
    "PASS: trace provider installed"
  );


  console.log("");
  console.log("=== 58H-C - EXECUTE REVIEW-REQUIRED REQUEST ===");

  let executionError: unknown = undefined;

  try {

    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {

        prompt:
          "TRACE 58 provider request requiring human review",

      },

      metadata: {

        trace:
          "58H",

        requiresReview:
          true,

      },

    });

  } catch (error) {

    executionError = error;

  }


  console.log(
    "Provider calls after request:",
    provider.calls
  );


  console.log("");
  console.log("=== 58H-D - PROVIDER MUST NOT EXECUTE ===");

  assert.equal(
    provider.calls,
    0,
    "ESCALATE must prevent provider execution"
  );

  console.log(
    "PASS: provider.generate() was NOT invoked"
  );


  console.log("");
  console.log("=== 58H-E - DECISION TRACE ===");

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
    "trace58-escalate-agent"
  );


  assert.equal(
    decision.action,
    "provider.generate"
  );


  assert.equal(
    decision.decision,
    "escalate"
  );


  console.log(
    "PASS: ESCALATE decision trace persisted"
  );


  console.log("");
  console.log("=== 58H-F - ESCALATION REASON ===");

  assert.match(
    decision.reason,
    /permission review|required/i
  );

  console.log(
    "PASS: escalation reason persisted"
  );


  console.log("");
  console.log("=== 58H-G - PROVIDER BOUNDARY INVARIANT ===");

  assert.equal(
    provider.calls,
    0,
    "Provider boundary must NOT be crossed"
  );

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
    "Provider boundary crossed: NO"
  );

  console.log(
    "Execution blocked pending review:",
    executionError !== undefined
      ? "YES"
      : "NO"
  );


  console.log("");
  console.log(
    "PASS: ESCALATE -> AUDIT -> NO PROVIDER EXECUTION"
  );


  console.log("");
  console.log("==================================================");
  console.log(" TRACE 58H COMPLETE");
  console.log("==================================================");
}


main().catch((error) => {

  console.error("");
  console.error("TRACE 58H FAILED");
  console.error(error);

  process.exit(1);

});
