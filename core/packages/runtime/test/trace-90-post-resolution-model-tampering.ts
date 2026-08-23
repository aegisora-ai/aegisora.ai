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


class Trace90Provider extends BaseProvider {

  public readonly name = "trace90-provider";

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
      "trace90-provider",
      request.model,
      `TRACE90:${request.prompt}`
    );
  }
}


class Trace90Manager extends ProviderManager {

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
  console.log(" TRACE 90 - POST-RESOLUTION MODEL TAMPERING");
  console.log("==================================================");


  const context =
    new RuntimeContext();


  const agentId =
    "trace90-agent";


  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });


  const provider =
    new Trace90Provider();


  const router =
    new ProviderRouter();


  router.register(
    "openai",
    provider
  );


  const manager =
    new Trace90Manager(router);


  const gateway =
    new ProviderExecutionGateway(
      context,
      router,
      manager
    );


  /*
   * ----------------------------------------------------------
   * 90A - EXPLICIT MODEL
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 90A - EXPLICIT MODEL ===");


  const canonicalModel =
    "trace90-canonical-model";


  await gateway.generate({

    agentId,

    provider:
      "openai",

    request: {

      model:
        canonicalModel,

      prompt:
        "TRACE 90 explicit model",

    },

    metadata: {

      trace:
        "90A",

      model:
        "attacker-metadata-model",

    },

  });


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
    1
  );


  assert.equal(
    provider.lastRequest?.model,
    canonicalModel,
    "Explicit canonical model must reach provider"
  );


  assert.equal(
    provider.lastContext?.metadata?.model,
    canonicalModel,
    "Runtime model must remain canonical"
  );


  assert.notEqual(
    provider.lastRequest?.model,
    "attacker-metadata-model"
  );


  assert.notEqual(
    provider.lastContext?.metadata?.model,
    "attacker-metadata-model"
  );


  console.log(
    "PASS: explicit model survives full execution path"
  );


  /*
   * ----------------------------------------------------------
   * 90B - DEFAULT RESOLUTION
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 90B - DEFAULT RESOLUTION ===");


  const beforeDefault =
    manager.defaultModelCalls;


  await gateway.generate({

    agentId,

    provider:
      "openai",

    request: {

      prompt:
        "TRACE 90 resolved default model",

    },

    metadata: {

      trace:
        "90B",

      model:
        "attacker-pre-resolution-model",

    },

  });


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
    beforeDefault + 1,
    "Missing request.model must resolve default exactly once"
  );


  assert.equal(
    provider.lastRequest?.model,
    "gpt-4.1-mini",
    "Resolved default model must reach provider"
  );


  assert.equal(
    provider.lastContext?.metadata?.model,
    "gpt-4.1-mini",
    "Resolved default model must reach runtime"
  );


  assert.notEqual(
    provider.lastRequest?.model,
    "attacker-pre-resolution-model"
  );


  assert.notEqual(
    provider.lastContext?.metadata?.model,
    "attacker-pre-resolution-model"
  );


  console.log(
    "PASS: resolved default model survives execution path"
  );


  /*
   * ----------------------------------------------------------
   * 90C - PROVIDER BOUNDARY IMMUTABILITY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 90C - PROVIDER BOUNDARY IMMUTABILITY ===");


  const providerModels =
    [...provider.models];


  console.log(
    "Provider models:",
    JSON.stringify(providerModels)
  );


  assert.deepEqual(
    providerModels,
    [
      canonicalModel,
      "gpt-4.1-mini",
    ],
    "Only canonical models may cross provider boundary"
  );


  assert.equal(
    providerModels.includes(
      "attacker-metadata-model"
    ),
    false
  );


  assert.equal(
    providerModels.includes(
      "attacker-pre-resolution-model"
    ),
    false
  );


  console.log(
    "PASS: no attacker model crossed provider boundary"
  );


  /*
   * ----------------------------------------------------------
   * 90D - AUDIT MODEL INTEGRITY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 90D - AUDIT MODEL INTEGRITY ===");


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


  const explicitDecision =
    records[0];


  const defaultDecision =
    records[1];


  assert.equal(
    explicitDecision.metadata.model,
    canonicalModel,
    "Explicit audit model must remain canonical"
  );


  assert.equal(
    defaultDecision.metadata.model,
    undefined,
    "Pre-resolution audit must not inherit attacker metadata"
  );


  assert.notEqual(
    explicitDecision.metadata.model,
    "attacker-metadata-model"
  );


  assert.notEqual(
    defaultDecision.metadata.model,
    "attacker-pre-resolution-model"
  );


  console.log(
    "PASS: audit model identity remains canonical"
  );


  /*
   * ----------------------------------------------------------
   * 90E - FINAL INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 90E - FINAL MODEL INTEGRITY ===");


  console.log(
    "Execution models:",
    JSON.stringify(
      provider.models
    )
  );


  console.log(
    "Default resolutions:",
    manager.defaultModelCalls
  );


  assert.deepEqual(
    provider.models,
    [
      canonicalModel,
      "gpt-4.1-mini",
    ]
  );


  assert.equal(
    manager.defaultModelCalls,
    1
  );


  console.log("");
  console.log(
    "PASS: REQUEST model is canonical"
  );

  console.log(
    "PASS: RESOLVED default model is canonical"
  );

  console.log(
    "PASS: metadata.model cannot mutate execution"
  );

  console.log(
    "PASS: metadata.model cannot mutate audit"
  );

  console.log(
    "PASS: only canonical models cross provider boundary"
  );


  console.log("");
  console.log("==================================================");
  console.log(" TRACE 90 COMPLETE");
  console.log("==================================================");
}


main().catch((error) => {

  console.error("");
  console.error("TRACE 90 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
