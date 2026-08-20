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


class Trace89Provider extends BaseProvider {

  public readonly name = "trace89-provider";

  public calls = 0;

  public models: string[] = [];

  public lastRequest: ProviderRequest | undefined;

  public lastContext: any = undefined;

  async generate(
    request: ProviderRequest,
    context: any
  ): Promise<ProviderResponse> {

    this.calls++;

    this.models.push(request.model);

    this.lastRequest = request;

    this.lastContext = context;

    return this.buildResponse(
      "trace89-provider",
      request.model,
      `TRACE89:${request.prompt}`
    );
  }
}


class Trace89Manager extends ProviderManager {

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
  console.log(" TRACE 89 - POST-GOVERNANCE MODEL INTEGRITY");
  console.log("==================================================");


  const context =
    new RuntimeContext();


  const agentId =
    "trace89-agent";


  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });


  const provider =
    new Trace89Provider();


  const router =
    new ProviderRouter();


  router.register(
    "openai",
    provider
  );


  const manager =
    new Trace89Manager(router);


  const gateway =
    new ProviderExecutionGateway(
      context,
      router,
      manager
    );


  /*
   * ----------------------------------------------------------
   * 89A - EXPLICIT MODEL
   * ----------------------------------------------------------
   *
   * request.model is canonical.
   *
   * metadata.model attempts to replace it.
   */

  console.log("");
  console.log("=== 89A - EXPLICIT MODEL INTEGRITY ===");


  const explicitModel =
    "trace89-canonical-model";


  const spoofedModel =
    "attacker-post-governance-model";


  const response =
    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {

        model:
          explicitModel,

        prompt:
          "TRACE 89 explicit model integrity",

      },

      metadata: {

        trace:
          "89A",

        model:
          spoofedModel,

        provider:
          "attacker-provider",

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
    "Provider model:",
    provider.lastRequest?.model
  );


  console.log(
    "Runtime model:",
    provider.lastContext?.metadata?.model
  );


  assert.equal(
    provider.calls,
    1,
    "Explicit ALLOW must execute provider exactly once"
  );


  assert.equal(
    provider.lastRequest?.model,
    explicitModel,
    "Provider must receive canonical explicit model"
  );


  assert.equal(
    provider.lastContext?.metadata?.model,
    explicitModel,
    "Runtime must preserve canonical explicit model"
  );


  assert.notEqual(
    provider.lastRequest?.model,
    spoofedModel,
    "Metadata model must never reach provider request"
  );


  assert.notEqual(
    provider.lastContext?.metadata?.model,
    spoofedModel,
    "Metadata model must never reach runtime context"
  );


  console.log(
    "PASS: explicit canonical model survives governance boundary"
  );


  /*
   * ----------------------------------------------------------
   * 89B - DEFAULT MODEL
   * ----------------------------------------------------------
   *
   * No request.model.
   *
   * metadata.model is attacker controlled.
   *
   * Default model must be resolved only after ALLOW.
   */

  console.log("");
  console.log("=== 89B - DEFAULT MODEL INTEGRITY ===");


  const beforeDefaultCalls =
    manager.defaultModelCalls;


  await gateway.generate({

    agentId,

    provider:
      "openai",

    request: {

      prompt:
        "TRACE 89 default model integrity",

    },

    metadata: {

      trace:
        "89B",

      model:
        "attacker-default-model",

    },

  });


  console.log(
    "Provider calls:",
    provider.calls
  );


  console.log(
    "getDefaultModel calls:",
    manager.defaultModelCalls
  );


  console.log(
    "Provider model:",
    provider.lastRequest?.model
  );


  console.log(
    "Runtime model:",
    provider.lastContext?.metadata?.model
  );


  assert.equal(
    manager.defaultModelCalls,
    beforeDefaultCalls + 1,
    "ALLOW must resolve default model exactly once"
  );


  assert.equal(
    provider.lastRequest?.model,
    "gpt-4.1-mini",
    "Provider must receive configured default model"
  );


  assert.equal(
    provider.lastContext?.metadata?.model,
    "gpt-4.1-mini",
    "Runtime must receive configured default model"
  );


  assert.notEqual(
    provider.lastRequest?.model,
    "attacker-default-model"
  );


  assert.notEqual(
    provider.lastContext?.metadata?.model,
    "attacker-default-model"
  );


  console.log(
    "PASS: resolved default model cannot be replaced by metadata"
  );


  /*
   * ----------------------------------------------------------
   * 89C - BLOCK
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 89C - BLOCK ===");


  const callsBeforeBlock =
    provider.calls;


  const defaultsBeforeBlock =
    manager.defaultModelCalls;


  try {

    await gateway.generate({

      agentId,

      provider:
        "unknown" as any,

      request: {

        prompt:
          "TRACE 89 blocked model integrity",

      },

      metadata: {

        trace:
          "89C",

        model:
          "attacker-block-model",

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
    provider.calls,
    callsBeforeBlock,
    "BLOCK must not reach provider"
  );


  assert.equal(
    manager.defaultModelCalls,
    defaultsBeforeBlock,
    "BLOCK must not resolve default model"
  );


  console.log(
    "PASS: BLOCK prevents provider execution and model resolution"
  );


  /*
   * ----------------------------------------------------------
   * 89D - ESCALATE
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 89D - ESCALATE ===");


  const callsBeforeEscalate =
    provider.calls;


  const defaultsBeforeEscalate =
    manager.defaultModelCalls;


  try {

    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {

        prompt:
          "TRACE 89 escalation model integrity",

      },

      metadata: {

        trace:
          "89D",

        requiresReview:
          true,

        model:
          "attacker-escalation-model",

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
    provider.calls,
    callsBeforeEscalate,
    "ESCALATE must not reach provider"
  );


  assert.equal(
    manager.defaultModelCalls,
    defaultsBeforeEscalate,
    "ESCALATE must not resolve default model"
  );


  console.log(
    "PASS: ESCALATE prevents provider execution and model resolution"
  );


  /*
   * ----------------------------------------------------------
   * 89E - FINAL INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 89E - FINAL MODEL INTEGRITY INVARIANT ===");


  console.log(
    "Provider models:",
    JSON.stringify(
      provider.models
    )
  );


  console.log(
    "Provider calls:",
    provider.calls
  );


  console.log(
    "Default model resolutions:",
    manager.defaultModelCalls
  );


  assert.deepEqual(
    provider.models,
    [
      "trace89-canonical-model",
      "gpt-4.1-mini",
    ],
    "Only canonical models may reach provider execution"
  );


  assert.equal(
    provider.calls,
    2
  );


  /*
   * Explicit request.model does NOT require default resolution.
   *
   * Only the second ALLOW request omitted request.model, therefore
   * getDefaultModel() must have been called exactly once.
   */
  assert.equal(
    manager.defaultModelCalls,
    1,
    "Only requests without an explicit model may resolve the default model"
  );


  console.log("");
  console.log(
    "PASS: only canonical models crossed provider boundary"
  );

  console.log(
    "PASS: metadata.model never crossed provider boundary"
  );

  console.log(
    "PASS: BLOCK crossed zero provider/model-resolution boundary"
  );

  console.log(
    "PASS: ESCALATE crossed zero provider/model-resolution boundary"
  );


  console.log("");
  console.log("==================================================");
  console.log(" TRACE 89 COMPLETE");
  console.log("==================================================");
}


main().catch((error) => {

  console.error("");
  console.error("TRACE 89 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
