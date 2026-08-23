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
 * TRACE 92 PROVIDERS
 * ============================================================
 */

class Trace92OpenAIProvider extends BaseProvider {

  public readonly name = "trace92-openai";

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
      "trace92-openai",
      request.model,
      `TRACE92-OPENAI:${request.prompt}`
    );
  }
}


class Trace92AnthropicProvider extends BaseProvider {

  public readonly name = "trace92-anthropic";

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
      "trace92-anthropic",
      request.model,
      `TRACE92-ANTHROPIC:${request.prompt}`
    );
  }
}


/*
 * ============================================================
 * MANAGER
 * ============================================================
 */

class Trace92Manager extends ProviderManager {

  public defaultModelCalls = 0;

  public defaultModels: string[] = [];

  override getDefaultModel(
    provider: any
  ): string {

    this.defaultModelCalls++;

    const model =
      super.getDefaultModel(
        provider
      );

    this.defaultModels.push(
      model
    );

    return model;
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
    `${label}: canonical runtime provider mismatch`
  );

  assert.equal(
    context?.metadata?.provider,
    expected,
    `${label}: canonical metadata provider mismatch`
  );
}


function assertNoSpoof(
  actual: unknown,
  spoofed: string,
  label: string
) {

  assert.notEqual(
    actual,
    spoofed,
    `${label}: attacker value crossed canonical boundary`
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
  console.log(" TRACE 92 - CROSS-PROVIDER RESOLUTION AUTHORITY");
  console.log("==================================================");


  const context =
    new RuntimeContext();


  const agentId =
    "trace92-agent";


  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });


  const openai =
    new Trace92OpenAIProvider();


  const anthropic =
    new Trace92AnthropicProvider();


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
    new Trace92Manager(
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
   * 92A - OPENAI EXPLICIT MODEL
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92A - OPENAI EXPLICIT RESOLUTION ===");


  const openAICanonical =
    "trace92-openai-canonical-model";


  await gateway.generate({

    agentId,

    provider:
      "openai",

    request: {

      model:
        openAICanonical,

      prompt:
        "TRACE 92 OpenAI explicit resolution",

    },

    metadata: {

      trace:
        "92A",

      provider:
        "anthropic",

      model:
        "trace92-attacker-anthropic-model",

    },

  });


  console.log(
    "OpenAI calls:",
    openai.calls
  );

  console.log(
    "Anthropic calls:",
    anthropic.calls
  );

  console.log(
    "OpenAI provider:",
    openai.lastContext?.provider
  );

  console.log(
    "OpenAI model:",
    openai.lastRequest?.model
  );


  assert.equal(
    openai.calls,
    1
  );


  assert.equal(
    anthropic.calls,
    0
  );


  assert.equal(
    openai.lastRequest?.model,
    openAICanonical
  );


  assertCanonicalProvider(
    openai.lastContext,
    "openai",
    "92A"
  );


  assertNoSpoof(
    openai.lastRequest?.model,
    "trace92-attacker-anthropic-model",
    "92A"
  );


  console.log(
    "PASS: explicit OpenAI resolution remains canonical"
  );


  /*
   * ----------------------------------------------------------
   * 92B - ANTHROPIC EXPLICIT MODEL
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92B - ANTHROPIC EXPLICIT RESOLUTION ===");


  const anthropicCanonical =
    "trace92-anthropic-canonical-model";


  await gateway.generate({

    agentId,

    provider:
      "anthropic",

    request: {

      model:
        anthropicCanonical,

      prompt:
        "TRACE 92 Anthropic explicit resolution",

    },

    metadata: {

      trace:
        "92B",

      provider:
        "openai",

      model:
        "trace92-attacker-openai-model",

    },

  });


  console.log(
    "Anthropic calls:",
    anthropic.calls
  );

  console.log(
    "OpenAI calls:",
    openai.calls
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
    1
  );


  assert.equal(
    openai.calls,
    1
  );


  assert.equal(
    anthropic.lastRequest?.model,
    anthropicCanonical
  );


  assertCanonicalProvider(
    anthropic.lastContext,
    "anthropic",
    "92B"
  );


  assertNoSpoof(
    anthropic.lastRequest?.model,
    "trace92-attacker-openai-model",
    "92B"
  );


  console.log(
    "PASS: explicit Anthropic resolution remains canonical"
  );


  /*
   * ----------------------------------------------------------
   * 92C - OPENAI DEFAULT MODEL
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92C - OPENAI DEFAULT RESOLUTION ===");


  const beforeOpenAIDefault =
    manager.defaultModelCalls;


  await gateway.generate({

    agentId,

    provider:
      "openai",

    request: {

      prompt:
        "TRACE 92 OpenAI default resolution",

    },

    metadata: {

      trace:
        "92C",

      provider:
        "anthropic",

      model:
        "trace92-attacker-default-anthropic",

    },

  });


  console.log(
    "OpenAI calls:",
    openai.calls
  );

  console.log(
    "OpenAI model:",
    openai.lastRequest?.model
  );

  console.log(
    "OpenAI runtime model:",
    openai.lastContext?.metadata?.model
  );

  console.log(
    "Default model calls:",
    manager.defaultModelCalls
  );


  assert.equal(
    manager.defaultModelCalls,
    beforeOpenAIDefault + 1
  );


  assert.equal(
    openai.lastRequest?.model,
    "gpt-4.1-mini"
  );


  assert.equal(
    openai.lastContext?.metadata?.model,
    "gpt-4.1-mini"
  );


  assertNoSpoof(
    openai.lastRequest?.model,
    "trace92-attacker-default-anthropic",
    "92C"
  );


  assertNoSpoof(
    openai.lastContext?.metadata?.model,
    "trace92-attacker-default-anthropic",
    "92C"
  );


  console.log(
    "PASS: OpenAI default resolution ignores attacker metadata"
  );


  /*
   * ----------------------------------------------------------
   * 92D - ANTHROPIC DEFAULT MODEL
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92D - ANTHROPIC DEFAULT RESOLUTION ===");


  const beforeAnthropicDefault =
    manager.defaultModelCalls;


  await gateway.generate({

    agentId,

    provider:
      "anthropic",

    request: {

      prompt:
        "TRACE 92 Anthropic default resolution",

    },

    metadata: {

      trace:
        "92D",

      provider:
        "openai",

      model:
        "trace92-attacker-default-openai",

    },

  });


  console.log(
    "Anthropic calls:",
    anthropic.calls
  );

  console.log(
    "Anthropic model:",
    anthropic.lastRequest?.model
  );

  console.log(
    "Anthropic runtime model:",
    anthropic.lastContext?.metadata?.model
  );

  console.log(
    "Default model calls:",
    manager.defaultModelCalls
  );


  assert.equal(
    manager.defaultModelCalls,
    beforeAnthropicDefault + 1
  );


  /*
   * Provider-specific default authority:
   *
   * OpenAI    -> gpt-4.1-mini
   * Anthropic -> claude-3-5-sonnet
   *
   * The default model is resolved from the selected provider,
   * never from caller-controlled metadata.
   */
  assert.equal(
    anthropic.lastRequest?.model,
    "claude-3-5-sonnet",
    "Anthropic must receive its configured provider-specific default model"
  );


  assert.equal(
    anthropic.lastContext?.metadata?.model,
    "claude-3-5-sonnet",
    "Anthropic runtime must preserve its configured provider-specific default model"
  );


  assertNoSpoof(
    anthropic.lastRequest?.model,
    "trace92-attacker-default-openai",
    "92D"
  );


  assertNoSpoof(
    anthropic.lastContext?.metadata?.model,
    "trace92-attacker-default-openai",
    "92D"
  );


  console.log(
    "PASS: Anthropic default resolution ignores attacker metadata"
  );


  /*
   * ----------------------------------------------------------
   * 92E - AUDIT AUTHORITY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92E - AUDIT RESOLUTION AUTHORITY ===");


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
    4,
    "Exactly four ALLOW decisions expected"
  );


  const openAIExplicit =
    records[0];

  const anthropicExplicit =
    records[1];

  const openAIDefault =
    records[2];

  const anthropicDefault =
    records[3];


  assert.equal(
    openAIExplicit.metadata.provider,
    "openai"
  );

  assert.equal(
    openAIExplicit.metadata.model,
    openAICanonical
  );


  assert.equal(
    anthropicExplicit.metadata.provider,
    "anthropic"
  );

  assert.equal(
    anthropicExplicit.metadata.model,
    anthropicCanonical
  );


  /*
   * Default model resolution occurs AFTER governance.
   *
   * Therefore the decision evidence for the default-model
   * requests must not inherit attacker-controlled metadata.model.
   */

  assert.equal(
    openAIDefault.metadata.provider,
    "openai"
  );

  assert.equal(
    openAIDefault.metadata.model,
    undefined
  );


  assert.equal(
    anthropicDefault.metadata.provider,
    "anthropic"
  );

  assert.equal(
    anthropicDefault.metadata.model,
    undefined
  );


  assertNoSpoof(
    openAIDefault.metadata.model,
    "trace92-attacker-default-anthropic",
    "92E OpenAI audit"
  );


  assertNoSpoof(
    anthropicDefault.metadata.model,
    "trace92-attacker-default-openai",
    "92E Anthropic audit"
  );


  console.log(
    "PASS: audit authority remains bound to canonical provider"
  );

  console.log(
    "PASS: pre-resolution audit does not inherit attacker model"
  );


  /*
   * ----------------------------------------------------------
   * 92F - PROVIDER BOUNDARY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92F - PROVIDER BOUNDARY ===");


  console.log(
    "OpenAI models:",
    JSON.stringify(
      openai.models
    )
  );


  console.log(
    "Anthropic models:",
    JSON.stringify(
      anthropic.models
    )
  );


  assert.deepEqual(
    openai.models,
    [
      openAICanonical,
      "gpt-4.1-mini",
    ]
  );


  /*
   * Provider-specific execution boundary:
   *
   * OpenAI    -> gpt-4.1-mini
   * Anthropic -> claude-3-5-sonnet
   *
   * A provider must never inherit another provider's
   * configured default model.
   */
  assert.deepEqual(
    anthropic.models,
    [
      anthropicCanonical,
      "claude-3-5-sonnet",
    ],
    "Anthropic provider boundary must preserve its provider-specific default"
  );


  assert.equal(
    openai.models.includes(
      "trace92-attacker-anthropic-model"
    ),
    false
  );


  assert.equal(
    openai.models.includes(
      "trace92-attacker-default-anthropic"
    ),
    false
  );


  assert.equal(
    anthropic.models.includes(
      "trace92-attacker-openai-model"
    ),
    false
  );


  assert.equal(
    anthropic.models.includes(
      "trace92-attacker-default-openai"
    ),
    false
  );


  console.log(
    "PASS: no attacker model crossed provider boundary"
  );


  /*
   * ----------------------------------------------------------
   * 92G - BLOCK
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92G - BLOCK ===");


  const callsBeforeBlockOpenAI =
    openai.calls;

  const callsBeforeBlockAnthropic =
    anthropic.calls;

  const defaultsBeforeBlock =
    manager.defaultModelCalls;


  try {

    await gateway.generate({

      agentId,

      provider:
        "unknown" as any,

      request: {

        prompt:
          "TRACE 92 blocked resolution",

      },

      metadata: {

        trace:
          "92G",

        provider:
          "openai",

        model:
          "gpt-4.1-mini",

      },

    });


    assert.fail(
      "Unknown provider must be blocked"
    );

  } catch (error) {

    console.log(
      "Blocked:",
      error instanceof Error
        ? error.message
        : error
    );
  }


  assert.equal(
    openai.calls,
    callsBeforeBlockOpenAI
  );


  assert.equal(
    anthropic.calls,
    callsBeforeBlockAnthropic
  );


  assert.equal(
    manager.defaultModelCalls,
    defaultsBeforeBlock
  );


  console.log(
    "PASS: BLOCK prevents routing, execution and default resolution"
  );


  /*
   * ----------------------------------------------------------
   * 92H - ESCALATE
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92H - ESCALATE ===");


  const callsBeforeEscalateOpenAI =
    openai.calls;

  const callsBeforeEscalateAnthropic =
    anthropic.calls;

  const defaultsBeforeEscalate =
    manager.defaultModelCalls;


  try {

    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {

        prompt:
          "TRACE 92 escalation resolution",

      },

      metadata: {

        trace:
          "92H",

        requiresReview:
          true,

        provider:
          "anthropic",

        model:
          "trace92-escalation-attacker",

      },

    });


    assert.fail(
      "Review-required request must escalate"
    );

  } catch (error) {

    console.log(
      "Escalated:",
      error instanceof Error
        ? error.message
        : error
    );
  }


  assert.equal(
    openai.calls,
    callsBeforeEscalateOpenAI
  );


  assert.equal(
    anthropic.calls,
    callsBeforeEscalateAnthropic
  );


  assert.equal(
    manager.defaultModelCalls,
    defaultsBeforeEscalate
  );


  console.log(
    "PASS: ESCALATE prevents routing, execution and default resolution"
  );


  /*
   * ----------------------------------------------------------
   * 92I - FINAL INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 92I - FINAL RESOLUTION INVARIANT ===");


  console.log(
    "OpenAI calls:",
    openai.calls
  );

  console.log(
    "Anthropic calls:",
    anthropic.calls
  );

  console.log(
    "Default resolutions:",
    manager.defaultModelCalls
  );

  console.log(
    "OpenAI models:",
    JSON.stringify(
      openai.models
    )
  );

  console.log(
    "Anthropic models:",
    JSON.stringify(
      anthropic.models
    )
  );


  assert.equal(
    openai.calls,
    2,
    "OpenAI must execute exactly explicit + default"
  );


  assert.equal(
    anthropic.calls,
    2,
    "Anthropic must execute exactly explicit + default"
  );


  assert.equal(
    manager.defaultModelCalls,
    2,
    "Exactly two requests omitted request.model"
  );


  assert.deepEqual(
    openai.models,
    [
      openAICanonical,
      "gpt-4.1-mini",
    ]
  );


  /*
   * Provider-specific execution boundary:
   *
   * OpenAI    -> gpt-4.1-mini
   * Anthropic -> claude-3-5-sonnet
   *
   * A provider must never inherit another provider's
   * configured default model.
   */
  assert.deepEqual(
    anthropic.models,
    [
      anthropicCanonical,
      "claude-3-5-sonnet",
    ],
    "Anthropic provider boundary must preserve its provider-specific default"
  );


  console.log("");
  console.log(
    "PASS: provider selection remains request-authoritative"
  );

  console.log(
    "PASS: explicit model remains request-authoritative"
  );

  console.log(
    "PASS: default model resolution occurs only when model is absent"
  );

  console.log(
    "PASS: attacker provider metadata cannot redirect routing"
  );

  console.log(
    "PASS: attacker model metadata cannot redirect execution"
  );

  console.log(
    "PASS: BLOCK prevents provider/model resolution"
  );

  console.log(
    "PASS: ESCALATE prevents provider/model resolution"
  );

  console.log(
    "PASS: audit preserves canonical provider identity"
  );

  console.log(
    "PASS: only canonical provider/model values cross execution boundary"
  );


  console.log("");
  console.log("==================================================");
  console.log(" TRACE 92 COMPLETE");
  console.log("==================================================");
}


main().catch((error) => {

  console.error("");
  console.error("TRACE 92 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
