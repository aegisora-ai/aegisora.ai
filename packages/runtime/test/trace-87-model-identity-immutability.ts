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


class Trace87Provider extends BaseProvider {

  public readonly name = "trace87-provider";

  public calls = 0;

  public lastContext: any = undefined;

  public lastRequest: ProviderRequest | undefined = undefined;

  async generate(
    request: ProviderRequest,
    context: any
  ): Promise<ProviderResponse> {

    this.calls++;

    this.lastRequest = request;
    this.lastContext = context;

    return this.buildResponse(
      "trace87-provider",
      request.model,
      `TRACE87:${request.prompt}`
    );
  }
}


class Trace87Manager extends ProviderManager {

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
  console.log(" TRACE 87 - MODEL IDENTITY IMMUTABILITY");
  console.log("==================================================");


  const context =
    new RuntimeContext();


  const agentId =
    "trace87-agent";


  context.agentRegistry.register({
    id: agentId,
    name: agentId,
  });


  const provider =
    new Trace87Provider();


  const router =
    new ProviderRouter();


  router.register(
    "openai",
    provider
  );


  const manager =
    new Trace87Manager(router);


  const gateway =
    new ProviderExecutionGateway(
      context,
      router,
      manager
    );


  /*
   * ----------------------------------------------------------
   * 87A - EXPLICIT REQUEST MODEL
   * ----------------------------------------------------------
   *
   * Canonical request model must win over metadata.model.
   */

  console.log("");
  console.log("=== 87A - EXPLICIT REQUEST MODEL ===");


  const explicitModel =
    "trace87-canonical-model";


  const response =
    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {

        model:
          explicitModel,

        prompt:
          "TRACE 87 explicit canonical model",

      },

      metadata: {

        trace:
          "87A",

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
    "Request model:",
    provider.lastRequest?.model
  );


  console.log(
    "Runtime model:",
    provider.lastContext?.metadata?.model
  );


  const records =
    context.decisionStore.getAll();


  console.log(
    "Decision model:",
    records[0]?.metadata?.model
  );


  assert.equal(
    provider.calls,
    1,
    "Provider must execute exactly once"
  );


  assert.equal(
    provider.lastRequest?.model,
    explicitModel,
    "Provider request must use canonical request model"
  );


  assert.equal(
    provider.lastContext?.metadata?.model,
    explicitModel,
    "Runtime context model must remain canonical"
  );


  assert.equal(
    records[0]?.metadata?.model,
    explicitModel,
    "Decision trace model must remain canonical"
  );


  assert.notEqual(
    provider.lastContext?.metadata?.model,
    "attacker-controlled-model"
  );


  assert.notEqual(
    records[0]?.metadata?.model,
    "attacker-controlled-model"
  );


  console.log(
    "PASS: explicit request model overrides metadata spoof"
  );


  /*
   * ----------------------------------------------------------
   * 87B - DEFAULT MODEL RESOLUTION
   * ----------------------------------------------------------
   *
   * No request.model.
   *
   * metadata.model must NOT become the canonical model.
   *
   * Default model resolution happens only after ALLOW.
   */

  console.log("");
  console.log("=== 87B - DEFAULT MODEL RESOLUTION ===");


  const beforeDefaultCalls =
    manager.defaultModelCalls;


  const defaultResponse =
    await gateway.generate({

      agentId,

      provider:
        "openai",

      request: {

        prompt:
          "TRACE 87 default canonical model",

      },

      metadata: {

        trace:
          "87B",

        model:
          "attacker-controlled-model-2",

      },

    });


  console.log(
    "Output:",
    defaultResponse.output
  );


  console.log(
    "Provider calls:",
    provider.calls
  );


  console.log(
    "getDefaultModel calls:",
    manager.defaultModelCalls
  );


  const recordsAfterDefault =
    context.decisionStore.getAll();


  const defaultDecision =
    recordsAfterDefault[
      recordsAfterDefault.length - 1
    ];


  console.log(
    "Resolved provider model:",
    provider.lastRequest?.model
  );


  console.log(
    "Runtime model:",
    provider.lastContext?.metadata?.model
  );


  console.log(
    "Decision model:",
    defaultDecision.metadata.model
  );


  assert.equal(
    manager.defaultModelCalls,
    beforeDefaultCalls + 1,
    "ALLOW must resolve default model exactly once"
  );


  assert.equal(
    provider.calls,
    2,
    "Second ALLOW must invoke provider exactly once"
  );


  assert.equal(
    provider.lastRequest?.model,
    "gpt-4.1-mini",
    "Provider must use configured default model"
  );


  assert.equal(
    provider.lastContext?.metadata?.model,
    "gpt-4.1-mini",
    "Runtime context must use configured default model"
  );


  assert.equal(
    defaultDecision.metadata.model,
    undefined,
    "Enforcement audit must not trust metadata.model when request.model is absent"
  );


  assert.notEqual(
    provider.lastContext?.metadata?.model,
    "attacker-controlled-model-2"
  );


  console.log(
    "PASS: metadata cannot become canonical default model"
  );


  /*
   * ----------------------------------------------------------
   * 87C - FINAL MODEL IDENTITY INVARIANT
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("=== 87C - FINAL MODEL IDENTITY INVARIANT ===");


  console.log(
    "Explicit request model:",
    explicitModel
  );


  console.log(
    "Explicit runtime model:",
    records[0]?.metadata?.model
  );


  console.log(
    "Default runtime model:",
    provider.lastContext?.metadata?.model
  );


  console.log(
    "Default decision model:",
    defaultDecision.metadata.model
  );


  assert.equal(
    records[0]?.metadata?.model,
    explicitModel
  );


  assert.equal(
    provider.lastContext?.metadata?.model,
    "gpt-4.1-mini"
  );


  assert.equal(
    defaultDecision.metadata.model,
    undefined
  );


  console.log("");
  console.log(
    "PASS: REQUEST -> RUNTIME model identity is canonical"
  );


  console.log(
    "PASS: metadata.model cannot spoof runtime model"
  );


  console.log(
    "PASS: metadata.model cannot spoof audit model"
  );


  console.log("");
  console.log("==================================================");
  console.log(" TRACE 87 COMPLETE");
  console.log("==================================================");
}


main().catch((error) => {

  console.error("");
  console.error("TRACE 87 FAILED");
  console.error("");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
