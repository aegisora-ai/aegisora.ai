import assert from "node:assert/strict";

import {
  AgentRuntime,
} from "../src/agent/runtime/agent-runtime";

async function main() {

  console.log("");
  console.log("TRACE 73K-R6 - registry-backed identity authenticity");
  console.log("");

  const runtime = new AgentRuntime();
  const gateway = runtime.getProviderGateway();

  assert.ok(
    gateway,
    "Canonical ProviderExecutionGateway must exist",
  );

  console.log("PASS: Canonical gateway acquired.");

  /*
   * ------------------------------------------------------------
   * 1. CREATE REAL REGISTERED AGENT
   * ------------------------------------------------------------
   */

  const realAgentId = "trace-73k-r6-real-agent";

  const agent = runtime.create(realAgentId);

  assert.equal(
    agent.id,
    realAgentId,
    "Created agent identity must remain stable",
  );

  const registered = runtime.getAgentById(realAgentId);

  assert.ok(
    registered,
    "Created agent must exist in RuntimeContext AgentRegistry",
  );

  assert.equal(
    registered?.id,
    realAgentId,
    "Registry identity must match created agent",
  );

  console.log(
    `PASS: Agent is registered in canonical registry: ${realAgentId}`,
  );

  /*
   * ------------------------------------------------------------
   * 2. REAL REGISTERED IDENTITY
   * ------------------------------------------------------------
   */

  const realResponse = await gateway.generate({

    agentId: realAgentId,

    provider: "openai",

    request: {
      model: "gpt-4.1-mini",
      prompt:
        "TRACE 73K-R6 registered identity probe",
    },

    metadata: {
      trace: "73K-R6",
      identityCase: "registered",
    },
  });

  assert.equal(
    realResponse.provider,
    "openai",
    "Registered identity execution must preserve provider",
  );

  assert.equal(
    realResponse.model,
    "gpt-4.1-mini",
    "Registered identity execution must preserve model",
  );

  console.log(
    "PASS: Registered agent identity accepted by provider gateway.",
  );

  /*
   * ------------------------------------------------------------
   * 3. FAKE IDENTITY
   * ------------------------------------------------------------
   */

  const fakeAgentId = "trace-73k-r6-FORGED-agent";

  const fakeRegistered = runtime.getAgentById(fakeAgentId);

  assert.equal(
    fakeRegistered,
    undefined,
    "Forged identity must not exist in registry",
  );

  console.log(
    `PASS: Forged identity is absent from registry: ${fakeAgentId}`,
  );

  let forgedBlocked = false;

  try {

    await gateway.generate({

      agentId: fakeAgentId,

      provider: "openai",

      request: {
        model: "gpt-4.1-mini",
        prompt:
          "TRACE 73K-R6 forged identity probe",
      },

      metadata: {
        trace: "73K-R6",
        identityCase: "forged",
      },
    });

  } catch (error) {

    forgedBlocked = true;

    console.log(
      `Forged identity rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    forgedBlocked,
    true,
    "Forged agent identity MUST be blocked before provider execution",
  );

  console.log(
    "PASS: Forged identity blocked.",
  );

  /*
   * ------------------------------------------------------------
   * 4. EMPTY IDENTITY
   * ------------------------------------------------------------
   */

  let emptyBlocked = false;

  try {

    await gateway.generate({

      agentId: "",

      provider: "openai",

      request: {
        model: "gpt-4.1-mini",
        prompt:
          "TRACE 73K-R6 empty identity probe",
      },

      metadata: {
        trace: "73K-R6",
        identityCase: "empty",
      },
    });

  } catch (error) {

    emptyBlocked = true;

    console.log(
      `Empty identity rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    emptyBlocked,
    true,
    "Empty agent identity MUST be blocked",
  );

  console.log(
    "PASS: Empty identity blocked.",
  );

  /*
   * ------------------------------------------------------------
   * 5. REMOVE REAL AGENT
   * ------------------------------------------------------------
   */

  runtime.getAgentRegistry().remove(realAgentId);

  const removed = runtime.getAgentById(realAgentId);

  assert.equal(
    removed,
    undefined,
    "Removed agent must disappear from registry",
  );

  console.log(
    "PASS: Real agent removed from canonical registry.",
  );

  /*
   * ------------------------------------------------------------
   * 6. REMOVED IDENTITY
   * ------------------------------------------------------------
   */

  let removedBlocked = false;

  try {

    await gateway.generate({

      agentId: realAgentId,

      provider: "openai",

      request: {
        model: "gpt-4.1-mini",
        prompt:
          "TRACE 73K-R6 removed identity probe",
      },

      metadata: {
        trace: "73K-R6",
        identityCase: "removed",
      },
    });

  } catch (error) {

    removedBlocked = true;

    console.log(
      `Removed identity rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    removedBlocked,
    true,
    "Removed agent identity MUST be blocked",
  );

  console.log(
    "PASS: Removed identity blocked.",
  );

  /*
   * ------------------------------------------------------------
   * FINAL
   * ------------------------------------------------------------
   */

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 73K-R6 PASSED");
  console.log("============================================================");
  console.log("");

}

main().catch((error) => {

  console.error("");
  console.error("TRACE 73K-R6 FAILED");
  console.error("");
  console.error(error);

  process.exitCode = 1;
});