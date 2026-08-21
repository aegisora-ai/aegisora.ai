import assert from "node:assert/strict";

import {
  AgentRuntime,
} from "../src/agent/runtime/agent-runtime";

async function main() {
  console.log("");
  console.log("TRACE 73K-R3 - live provider capability execution");
  console.log("");

  const runtime = new AgentRuntime();

  const gateway = runtime.getProviderGateway();

  assert.ok(
    gateway,
    "AgentRuntime must expose canonical ProviderExecutionGateway",
  );

  console.log("PASS: Canonical gateway acquired.");

  const providers = gateway.list();

  assert.ok(
    Array.isArray(providers),
    "Gateway.list() must return provider list",
  );

  console.log(
    `PASS: Gateway.list() returned ${providers.length} provider(s).`,
  );

  assert.equal(
    providers.includes("openai"),
    true,
    "Canonical gateway must expose openai provider",
  );

  console.log("PASS: Canonical gateway exposes openai capability.");

  /*
   * ------------------------------------------------------------
   * AGENT IDENTITY
   * ------------------------------------------------------------
   *
   * Provider execution is a governed capability.
   * The canonical gateway therefore requires an explicit
   * execution identity.
   */
  const agentId = "trace-73k-live-agent";

  const agent = runtime.create(agentId);

  assert.ok(
    agent,
    "AgentRuntime.create() must return an agent",
  );

  assert.equal(
    agent.id,
    agentId,
    "Created agent identity must remain stable",
  );

  console.log(
    `PASS: Agent identity established: ${agentId}`,
  );

  /*
   * ------------------------------------------------------------
   * LIVE PROVIDER EXECUTION
   * ------------------------------------------------------------
   */
  const response = await gateway.generate({
    agentId,

    provider: "openai",

    request: {
      model: "gpt-4.1-mini",
      prompt:
        "TRACE 73K-R3 provider capability identity probe",
    },

    metadata: {
      trace: "73K-R3",
    },
  });

  assert.ok(
    response,
    "Gateway.generate() must return a provider response",
  );

  console.log(
    "PASS: Gateway.generate() completed.",
  );

  /*
   * ------------------------------------------------------------
   * PROVIDER IDENTITY
   * ------------------------------------------------------------
   */
  assert.equal(
    response.provider,
    "openai",
    "Provider identity must remain openai in final response",
  );

  console.log(
    "PASS: Provider identity preserved.",
  );

  /*
   * ------------------------------------------------------------
   * MODEL IDENTITY
   * ------------------------------------------------------------
   */
  assert.equal(
    response.model,
    "gpt-4.1-mini",
    "Model identity must remain stable through gateway execution",
  );

  console.log(
    "PASS: Model identity preserved.",
  );

  /*
   * ------------------------------------------------------------
   * OUTPUT
   * ------------------------------------------------------------
   */
  assert.equal(
    typeof response.output,
    "string",
    "Provider response must contain output",
  );

  assert.ok(
    response.output.length > 0,
    "Provider response output must not be empty",
  );

  console.log(
    "PASS: Provider execution returned a valid response payload.",
  );

  /*
   * ------------------------------------------------------------
   * CANONICAL GATEWAY IDENTITY
   * ------------------------------------------------------------
   */
  assert.strictEqual(
    runtime.getProviderGateway(),
    gateway,
    "Canonical gateway must remain stable after live execution",
  );

  console.log(
    "PASS: Canonical gateway identity remains stable after execution.",
  );

  console.log("");
  console.log("LIVE RESPONSE:");
  console.log(
    JSON.stringify(
      {
        provider: response.provider,
        model: response.model,
        output: response.output,
      },
      null,
      2,
    ),
  );

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73K-R3 PASSED");
  console.log("============================================================");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("TRACE 73K-R3 FAILED");
  console.error("");
  console.error(error);
  process.exitCode = 1;
});
