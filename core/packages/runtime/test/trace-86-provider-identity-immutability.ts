import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";
import { ProviderRouter } from "../src/providers/provider-router";
import { BaseProvider } from "../src/providers/base-provider";

import type {
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";

class Trace86Provider extends BaseProvider {

  public readonly name = "trace86-provider";

  public calls = 0;

  public lastContext: any = undefined;

  async generate(
    request: ProviderRequest,
    context: any
  ): Promise<ProviderResponse> {

    this.calls++;

    this.lastContext = context;

    return this.buildResponse(
      "trace86-provider",
      request.model,
      `TRACE86:${request.prompt}`
    );
  }
}

async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 86 - PROVIDER IDENTITY IMMUTABILITY");
  console.log("==================================================");

  const context =
    new RuntimeContext();

  const agentId =
    "trace86-agent";

  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });

  const provider =
    new Trace86Provider();

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
   * 86A - METADATA PROVIDER SPOOF
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 86A - METADATA PROVIDER SPOOF ===");

  const response =
    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {
        prompt:
          "TRACE 86 canonical provider identity",
      },

      metadata: {

        trace:
          "86A",

        /*
         * Deliberate conflicting metadata.
         */
        provider:
          "attacker-controlled-provider",

        model:
          "attacker-controlled-model",
      },
    });

  console.log(
    "Output:",
    response.output
  );

  console.log(
    "Provider calls:",
    provider.calls
  );

  console.log(
    "Provider context:",
    JSON.stringify(
      provider.lastContext,
      null,
      2
    )
  );

  /*
   * Canonical provider identity must win.
   */

  assert.equal(
    provider.calls,
    1,
    "Provider must execute exactly once"
  );

  assert.equal(
    provider.lastContext.provider,
    "openai",
    "Canonical provider identity must not be overridden by metadata"
  );

  assert.equal(
    provider.lastContext.metadata.provider,
    "openai",
    "Context metadata provider must remain canonical"
  );

  assert.equal(
    provider.lastContext.metadata.trace,
    "86A"
  );

  console.log(
    "PASS: metadata cannot override canonical provider identity"
  );

  /*
   * ----------------------------------------------------------
   * 86B - DECISION TRACE
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 86B - DECISION TRACE ===");

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
    1,
    "Exactly one decision expected"
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
    records[0].metadata.provider,
    "openai",
    "Decision trace provider identity must remain canonical"
  );

  assert.equal(
    records[0].metadata.trace,
    "86A"
  );

  console.log(
    "PASS: decision trace preserves canonical provider identity"
  );

  /*
   * ----------------------------------------------------------
   * 86C - FINAL INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 86C - FINAL IDENTITY INVARIANT ===");

  console.log(
    "Requested provider:",
    "openai"
  );

  console.log(
    "Metadata provider:",
    "attacker-controlled-provider"
  );

  console.log(
    "Runtime provider:",
    provider.lastContext.provider
  );

  console.log(
    "Decision provider:",
    records[0].metadata.provider
  );

  assert.equal(
    provider.lastContext.provider,
    "openai"
  );

  assert.equal(
    provider.lastContext.metadata.provider,
    "openai"
  );

  assert.equal(
    records[0].metadata.provider,
    "openai"
  );

  console.log("");
  console.log(
    "PASS: REQUEST -> RUNTIME -> AUDIT identity remains canonical"
  );

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 86 COMPLETE");
  console.log("==================================================");
}

main().catch((error) => {

  console.error("");
  console.error("TRACE 86 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
