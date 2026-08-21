import assert from "node:assert/strict";

import {
  AgentRuntime,
} from "../src/agent/runtime/agent-runtime";


async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 93 - PROTECTED AGENT EXECUTION BOUNDARY");
  console.log("==================================================");


  const runtime = new AgentRuntime();


  /*
   * ------------------------------------------------------------
   * 1. REGISTERED AGENT MUST PASS GOVERNANCE
   * ------------------------------------------------------------
   */

  const agentId = "trace93-protected-agent";

  runtime.create(agentId);


  let calls = 0;


  const result =
    await runtime.runProtectedAgent(
      agentId,
      "hello protected world",
      async (input) => {

        calls++;

        return `processed:${input}`;
      },
    );


  assert.equal(
    result.decision,
    "ALLOW",
    "Registered agent must receive ALLOW",
  );


  assert.equal(
    calls,
    1,
    "Runner must execute once after governance",
  );


  assert.equal(
    result.output,
    "processed:hello protected world",
  );


  console.log(
    "PASS: Registered agent crossed protected boundary.",
  );


  /*
   * ------------------------------------------------------------
   * 2. FORGED IDENTITY MUST NEVER EXECUTE
   * ------------------------------------------------------------
   */

  let forgedCalls = 0;


  let blocked = false;


  try {

    await runtime.runProtectedAgent(
      "forged-agent-id",
      "attack",
      async () => {

        forgedCalls++;

        return "should never happen";
      },
    );


  } catch {

    blocked = true;

  }


  assert.equal(
    blocked,
    true,
    "Forged agent must be rejected",
  );


  assert.equal(
    forgedCalls,
    0,
    "Blocked agent must never execute runner",
  );


  console.log(
    "PASS: Forged identity blocked before execution.",
  );


  console.log("");
  console.log("TRACE 93 PASS");
}


main().catch((error) => {

  console.error(
    "TRACE 93 FAILED",
  );

  console.error(error);

  process.exit(1);

});