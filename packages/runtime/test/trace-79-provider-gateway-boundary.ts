import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";
import { ProviderRouter } from "../src/providers/provider-router";
import { BaseProvider } from "../src/providers/base-provider";

import type {
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";

class Trace79Provider extends BaseProvider {

  public readonly name = "trace79-provider";

  public calls = 0;

  async generate(
    request: ProviderRequest,
    _context: unknown
  ): Promise<ProviderResponse> {

    this.calls++;

    return this.buildResponse(
      "trace79-provider",
      request.model,
      `TRACE79:${request.prompt}`
    );
  }
}

async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 79 - PROVIDER GATEWAY SECURITY BOUNDARY");
  console.log("==================================================");

  const context = new RuntimeContext();

  const agentId =
    "trace79-agent";

  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });

  const provider =
    new Trace79Provider();

  const router =
    new ProviderRouter();

  router.register(
    "openai",
    provider
  );

  const gateway =
    new ProviderExecutionGateway(
      context,
      router
    );

  /*
   * ----------------------------------------------------------
   * 79A - ALLOW
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 79A - ALLOW PROVIDER ===");

  const allowed =
    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {
        prompt:
          "TRACE 79 allowed provider request",
      },

      metadata: {
        trace:
          "79A",
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

  assert.equal(
    allowed.output,
    "TRACE79:TRACE 79 allowed provider request"
  );

  assert.equal(
    provider.calls,
    1,
    "ALLOW must invoke provider exactly once"
  );

  console.log(
    "PASS: ALLOW crossed provider boundary"
  );

  /*
   * ----------------------------------------------------------
   * 79B - UNKNOWN PROVIDER
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 79B - UNKNOWN PROVIDER ===");

  let unknownBlocked = false;

  try {

    await gateway.generate({

      agentId,

      provider:
        "unknown" as any,

      request: {
        prompt:
          "TRACE 79 unknown provider must never execute",
      },

      metadata: {
        trace:
          "79B",
      },
    });

  } catch (error) {

    unknownBlocked = true;

    console.log(
      "Blocked:",
      error instanceof Error
        ? error.message
        : error
    );
  }

  assert.equal(
    unknownBlocked,
    true,
    "Unknown provider must be blocked"
  );

  assert.equal(
    provider.calls,
    1,
    "Unknown provider must NOT invoke provider"
  );

  console.log(
    "PASS: unknown provider blocked before execution"
  );

  /*
   * ----------------------------------------------------------
   * 79C - ESCALATE
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 79C - ESCALATE PROVIDER ===");

  let escalated = false;

  try {

    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {
        prompt:
          "TRACE 79 provider requires human review",
      },

      metadata: {
        trace:
          "79C",

        requiresReview:
          true,
      },
    });

  } catch (error) {

    escalated = true;

    console.log(
      "Escalated:",
      error instanceof Error
        ? error.message
        : error
    );
  }

  assert.equal(
    escalated,
    true,
    "Review-required provider request must escalate"
  );

  assert.equal(
    provider.calls,
    1,
    "ESCALATE must NOT invoke provider"
  );

  console.log(
    "PASS: ESCALATE prevented provider execution"
  );

  /*
   * ----------------------------------------------------------
   * 79D - DECISION TRACE
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 79D - DECISION TRACE ===");

  const records =
    context.decisionStore.getAll();

  console.log(
    JSON.stringify(
      records,
      null,
      2
    )
  );

  assert.equal(
    records.length,
    3,
    "Exactly three provider decisions expected"
  );

  assert.equal(
    records[0].decision,
    "allow"
  );

  assert.equal(
    records[0].action,
    "provider.generate"
  );

  assert.equal(
    records[0].metadata.resourceType,
    "provider"
  );

  assert.equal(
    records[0].metadata.tool,
    "provider:openai"
  );

  assert.equal(
    records[1].decision,
    "block"
  );

  assert.equal(
    records[1].metadata.tool,
    "provider:unknown"
  );

  assert.equal(
    records[2].decision,
    "escalate"
  );

  assert.equal(
    records[2].metadata.tool,
    "provider:openai"
  );

  console.log(
    "PASS: ALLOW / BLOCK / ESCALATE traces persisted"
  );

  /*
   * ----------------------------------------------------------
   * 79E - FINAL SECURITY INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 79E - FINAL SECURITY INVARIANT ===");

  console.log(
    "Provider calls:",
    provider.calls
  );

  console.log(
    "Decision count:",
    records.length
  );

  assert.equal(
    provider.calls,
    1
  );

  assert.equal(
    records.length,
    3
  );

  console.log("");
  console.log(
    "PASS: ALLOW -> PROVIDER"
  );

  console.log(
    "PASS: BLOCK -> NO PROVIDER"
  );

  console.log(
    "PASS: ESCALATE -> NO PROVIDER"
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 79 COMPLETE");
  console.log("==================================================");
}

main().catch((error) => {

  console.error("");
  console.error("TRACE 79 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
