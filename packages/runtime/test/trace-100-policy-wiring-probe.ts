import assert from "node:assert/strict";
import { AgentRuntime } from "../src/agent/runtime/agent-runtime";
import { RuntimePolicyEngine } from "../src/policy/policy-engine";

async function main() {
  console.log("");
  console.log("============================================================");
  console.log(" TRACE 100 POLICY WIRING PROBE");
  console.log("============================================================");

  const runtime = new AgentRuntime();
  const runtimeAny = runtime as any;

  const context =
    runtimeAny.context ??
    runtimeAny.runtimeContext;

  console.log("");
  console.log("--- RUNTIME INTERNALS ---");

  console.log(
    "Runtime context exists:",
    !!context
  );

  assert.ok(
    context,
    "AgentRuntime must expose an internal runtime context."
  );

  console.log(
    "Policy object exists:",
    !!context.policy
  );

  assert.ok(
    context.policy,
    "RuntimeContext.policy must exist."
  );

  console.log(
    "Policy constructor:",
    context.policy?.constructor?.name
  );

  console.log(
    "Policy instanceof RuntimePolicyEngine:",
    context.policy instanceof RuntimePolicyEngine
  );

  console.log("");
  console.log("--- DIRECT POLICY ENGINE PROBE ---");

  const event = {
    id: "trace-100-policy-probe",
    type: "tool.called",
    agentId: "trace-100-r2-agent",
    timestamp: new Date(),
    payload: {
      tool: "provider:openai",
      action: "provider.generate",
      input: {
        prompt: "TRACE 100 R2 policy violation",
        model: "test-model"
      },
      metadata: {
        tool: "shell"
      }
    }
  } as any;

  console.log(
    "Canonical payload.tool:",
    event.payload.tool
  );

  console.log(
    "metadata.tool:",
    event.payload.metadata.tool
  );

  const decision =
    context.policy.evaluate(event);

  console.log("");
  console.log(
    "POLICY DECISION:",
    JSON.stringify(decision, null, 2)
  );

  console.log("");
  console.log("--- EXPECTED ---");

  console.log(
    "Expected allowed = false"
  );

  if (!decision.allowed) {
    console.log(
      "PASS: Live runtime policy blocks shell metadata."
    );
  } else {
    console.log(
      "FAIL: Live runtime policy allows shell metadata."
    );
  }

  console.log("");
  console.log("--- DIRECT FRESH ENGINE PROBE ---");

  const freshPolicy = new RuntimePolicyEngine();

  const freshDecision =
    freshPolicy.evaluate(event);

  console.log(
    "Fresh RuntimePolicyEngine:",
    JSON.stringify(
      freshDecision,
      null,
      2
    )
  );

  console.log("");
  console.log("--- FINAL DIAGNOSTIC ---");

  console.log(
    "Live policy constructor:",
    context.policy?.constructor?.name
  );

  console.log(
    "Fresh policy constructor:",
    freshPolicy.constructor.name
  );

  console.log(
    "Live allowed:",
    decision.allowed
  );

  console.log(
    "Fresh allowed:",
    freshDecision.allowed
  );

  console.log("");
  console.log("TRACE 100 POLICY WIRING PROBE COMPLETE");
}

main().catch((error) => {
  console.error("");
  console.error("============================================================");
  console.error(" TRACE 100 POLICY WIRING PROBE FAILED");
  console.error("============================================================");
  console.error(
    error instanceof Error
      ? error.stack ?? error.message
      : error
  );
  process.exitCode = 1;
});
