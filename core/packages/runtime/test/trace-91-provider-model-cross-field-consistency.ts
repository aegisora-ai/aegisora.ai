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


/*
 * ============================================================
 * TRACE 91 PROVIDERS
 * ============================================================
 */

class Trace91OpenAIProvider extends BaseProvider {

  public readonly name = "trace91-openai";

  public calls = 0;

  public models: string[] = [];

  public lastRequest:
    | ProviderRequest
    | undefined;

  public lastContext:
    | any
    | undefined;

  async generate(
    request: ProviderRequest,
    context: any
  ): Promise<ProviderResponse> {

    this.calls++;

    this.models.push(
      request.model
    );

    this.lastRequest =
      request;

    this.lastContext =
      context;

    return this.buildResponse(
      "trace91-openai",
      request.model,
      `TRACE91-OPENAI:${request.prompt}`
    );
  }
}


class Trace91AnthropicProvider extends BaseProvider {

  public readonly name = "trace91-anthropic";

  public calls = 0;

  public models: string[] = [];

  public lastRequest:
    | ProviderRequest
    | undefined;

  public lastContext:
    | any
    | undefined;

  async generate(
    request: ProviderRequest,
    context: any
  ): Promise<ProviderResponse> {

    this.calls++;

    this.models.push(
      request.model
    );

    this.lastRequest =
      request;

    this.lastContext =
      context;

    return this.buildResponse(
      "trace91-anthropic",
      request.model,
      `TRACE91-ANTHROPIC:${request.prompt}`
    );
  }
}


class Trace91Manager extends ProviderManager {

  public defaultModelCalls = 0;

  override getDefaultModel(
    provider: any
  ): string {

    this.defaultModelCalls++;

    return super.getDefaultModel(
      provider
    );
  }
}


/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function assertCanonicalProvider(
  context: any,
  expected: string,
  label: string
) {

  assert.equal(
    context?.provider,
    expected,
    `${label}: runtime provider must remain canonical`
  );

  assert.equal(
    context?.metadata?.provider,
    expected,
    `${label}: runtime metadata provider must remain canonical`
  );
}


function assertNoSpoofedModel(
  actual: unknown,
  spoofed: string,
  label: string
) {

  assert.notEqual(
    actual,
    spoofed,
    `${label}: spoofed model must never cross boundary`
  );
}


/*
 * ============================================================
 * MAIN
 * ============================================================
 */

async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 91 - PROVIDER MODEL CROSS-FIELD CONSISTENCY");
  console.log("==================================================");


  const context =
    new RuntimeContext();


  const agentId =
    "trace91-agent";


  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });


  const openai =
    new Trace91OpenAIProvider();


  const anthropic =
    new Trace91AnthropicProvider();


  const router =
    new ProviderRouter();


  router.register(
    "openai",
    openai
  );


  router.register(
    "anthropic",
    anthropic
  );


  const manager =
    new Trace91Manager(
      router
    );


  const gateway =
    new ProviderExecutionGateway(
      context,
      router,
      manager
    );


  /*
   * ----------------------------------------------------------
   * 91A - CANONICAL OPENAI + ATTACKER CROSS-FIELD METADATA
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 91A - OPENAI CROSS-FIELD SPOOF ===");


  const canonicalOpenAIModel =
    "trace91-openai-canonical-model";


  const spoofedProvider =
    "anthropic";


  const spoofedModel =
    "trace91-anthropic-attacker-model";


  await gateway.generate({

    agentId,

    provider:
      "openai",

    request: {

      model:
        canonicalOpenAIModel,

      prompt:
        "TRACE 91 OpenAI canonical identity",

    },

    metadata: {

      trace:
        "91A",

      provider:
        spoofedProvider,

      model:
        spoofedModel,

    },

  });


  console.log(
    "Provider calls:",
    openai.calls
  );


  console.log(
    "Provider:",
    openai.lastContext?.provider
  );


  console.log(
    "Provider metadata:",
    openai.lastContext?.metadata?.provider
  );


  console.log(
    "Provider model:",
    openai.lastRequest?.model
  );


  assert.equal(
    openai.calls,
    1,
    "OpenAI request must execute exactly once"
  );


  assert.equal(
    anthropic.calls,
    0,
    "Spoofed provider must not receive execution"
  );


  assert.equal(
    openai.lastRequest?.model,
    canonicalOpenAIModel,
    "Canonical OpenAI model must reach OpenAI provider"
  );


  assertCanonicalProvider(
    openai.lastContext,
    "openai",
    "91A"
  );


  assertNoSpoofedModel(
    openai.lastRequest?.model,
    spoofedModel,
    "91A"
  );


  assertNoSpoofedModel(
    openai.lastContext?.metadata?.model,
    spoofedModel,
    "91A"
  );


  console.log(
    "PASS: provider/model cross-field spoof cannot redirect execution"
  );


  /*
   * ----------------------------------------------------------
   * 91B - ANTHROPIC CANONICAL + OPENAI SPOOF
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 91B - ANTHROPIC CROSS-FIELD SPOOF ===");


  const canonicalAnthropicModel =
    "trace91-anthropic-canonical-model";


  const spoofedOpenAIModel =
    "trace91-openai-attacker-model";


  await gateway.generate({

    agentId,

    provider:
      "anthropic",

    request: {

      model:
        canonicalAnthropicModel,

      prompt:
        "TRACE 91 Anthropic canonical identity",

    },

    metadata: {

      trace:
        "91B",

      provider:
        "openai",

      model:
        spoofedOpenAIModel,

    },

  });


  console.log(
    "Anthropic calls:",
    anthropic.calls
  );


  console.log(
    "Anthropic provider:",
    anthropic.lastContext?.provider
  );


  console.log(
    "Anthropic model:",
    anthropic.lastRequest?.model
  );


  assert.equal(
    anthropic.calls,
    1,
    "Anthropic request must execute exactly once"
  );


  assert.equal(
    openai.calls,
    1,
    "OpenAI must not receive Anthropic execution"
  );


  assert.equal(
    anthropic.lastRequest?.model,
    canonicalAnthropicModel,
    "Canonical Anthropic model must reach Anthropic provider"
  );


  assertCanonicalProvider(
    anthropic.lastContext,
    "anthropic",
    "91B"
  );


  assertNoSpoofedModel(
    anthropic.lastRequest?.model,
    spoofedOpenAIModel,
    "91B"
  );


  assertNoSpoofedModel(
    anthropic.lastContext?.metadata?.model,
    spoofedOpenAIModel,
    "91B"
  );


  console.log(
    "PASS: reverse provider/model spoof cannot redirect execution"
  );


  /*
   * ----------------------------------------------------------
   * 91C - AUDIT CROSS-FIELD CONSISTENCY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 91C - AUDIT CROSS-FIELD CONSISTENCY ===");


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
    2,
    "Exactly two ALLOW decisions expected"
  );


  const openAIDecision =
    records[0];


  const anthropicDecision =
    records[1];


  assert.equal(
    openAIDecision.metadata.provider,
    "openai",
    "OpenAI audit provider must remain canonical"
  );


  assert.equal(
    openAIDecision.metadata.model,
    canonicalOpenAIModel,
    "OpenAI audit model must remain canonical"
  );


  assert.equal(
    anthropicDecision.metadata.provider,
    "anthropic",
    "Anthropic audit provider must remain canonical"
  );


  assert.equal(
    anthropicDecision.metadata.model,
    canonicalAnthropicModel,
    "Anthropic audit model must remain canonical"
  );


  assert.notEqual(
    openAIDecision.metadata.provider,
    "anthropic"
  );


  assert.notEqual(
    openAIDecision.metadata.model,
    spoofedModel
  );


  assert.notEqual(
    anthropicDecision.metadata.provider,
    "openai"
  );


  assert.notEqual(
    anthropicDecision.metadata.model,
    spoofedOpenAIModel
  );


  console.log(
    "PASS: audit preserves provider/model pair integrity"
  );


  /*
   * ----------------------------------------------------------
   * 91D - PROVIDER/MODEL PAIR INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 91D - PROVIDER/MODEL PAIR INVARIANT ===");


  const openAIPair = {

    provider:
      openai.lastContext?.provider,

    model:
      openai.lastRequest?.model,

  };


  const anthropicPair = {

    provider:
      anthropic.lastContext?.provider,

    model:
      anthropic.lastRequest?.model,

  };


  console.log(
    "OpenAI pair:",
    JSON.stringify(
      openAIPair
    )
  );


  console.log(
    "Anthropic pair:",
    JSON.stringify(
      anthropicPair
    )
  );


  assert.deepEqual(
    openAIPair,
    {
      provider:
        "openai",

      model:
        canonicalOpenAIModel,
    },
    "OpenAI provider/model pair must remain canonical"
  );


  assert.deepEqual(
    anthropicPair,
    {
      provider:
        "anthropic",

      model:
        canonicalAnthropicModel,
    },
    "Anthropic provider/model pair must remain canonical"
  );


  console.log(
    "PASS: provider/model pair remains internally consistent"
  );


  /*
   * ----------------------------------------------------------
   * 91E - FINAL INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 91E - FINAL CROSS-FIELD INVARIANT ===");


  console.log(
    "OpenAI execution models:",
    JSON.stringify(
      openai.models
    )
  );


  console.log(
    "Anthropic execution models:",
    JSON.stringify(
      anthropic.models
    )
  );


  console.log(
    "OpenAI calls:",
    openai.calls
  );


  console.log(
    "Anthropic calls:",
    anthropic.calls
  );


  assert.deepEqual(
    openai.models,
    [
      canonicalOpenAIModel,
    ],
    "Only canonical OpenAI model may cross provider boundary"
  );


  assert.deepEqual(
    anthropic.models,
    [
      canonicalAnthropicModel,
    ],
    "Only canonical Anthropic model may cross provider boundary"
  );


  assert.equal(
    openai.calls,
    1
  );


  assert.equal(
    anthropic.calls,
    1
  );


  assert.equal(
    manager.defaultModelCalls,
    0,
    "Explicit models must not invoke default model resolution"
  );


  console.log("");
  console.log(
    "PASS: provider identity is canonical"
  );


  console.log(
    "PASS: model identity is canonical"
  );


  console.log(
    "PASS: provider/model cross-field relationship is canonical"
  );


  console.log(
    "PASS: attacker provider cannot redirect execution"
  );


  console.log(
    "PASS: attacker model cannot redirect execution"
  );


  console.log(
    "PASS: audit preserves canonical provider/model pair"
  );


  console.log(
    "PASS: only canonical provider/model pairs crossed provider boundary"
  );


  console.log("");
  console.log("==================================================");
  console.log(" TRACE 91 COMPLETE");
  console.log("==================================================");
}


main().catch((error) => {

  console.error("");
  console.error("TRACE 91 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
