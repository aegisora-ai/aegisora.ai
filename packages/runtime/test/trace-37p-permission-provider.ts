import assert from "node:assert/strict";

import { PermissionEngine } from "../src/permissions";
import { ProviderExecutionGateway } from "../src/providers";
import { RuntimeContext } from "../src/context/runtime-context";
import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

function check(
  engine: PermissionEngine,
  request: {
    agentId: string;
    tool: string;
    action: string;
    metadata?: Record<string, unknown>;
  },
) {
  return engine.check(request);
}

async function main() {

  console.log("");
  console.log("============================================================");
  console.log("TRACE 37P - PERMISSION + PROVIDER REGRESSION SUITE");
  console.log("============================================================");

  const permissions = new PermissionEngine();

  /*
   * ----------------------------------------------------------
   * 1. TOOL ALLOW
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[1] Known tool -> ALLOW");

  const echo = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "echo",
      action: "tool.execute",
    },
  );

  console.log(echo);

  assert.equal(
    echo.action,
    "allow",
  );

  /*
   * ----------------------------------------------------------
   * 2. RESTRICTED TOOL -> DENY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[2] Restricted tool -> DENY");

  const shell = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "shell",
      action: "tool.execute",
    },
  );

  console.log(shell);

  assert.equal(
    shell.action,
    "deny",
  );

  /*
   * ----------------------------------------------------------
   * 3. UNKNOWN TOOL -> DENY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[3] Unknown tool -> DENY");

  const unknownTool = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "unknown-tool",
      action: "tool.execute",
    },
  );

  console.log(unknownTool);

  assert.equal(
    unknownTool.action,
    "deny",
  );

  /*
   * ----------------------------------------------------------
   * 4. OPENAI PROVIDER -> ALLOW
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[4] OpenAI provider -> ALLOW");

  const openai = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "provider:openai",
      action: "provider.generate",
    },
  );

  console.log(openai);

  assert.equal(
    openai.action,
    "allow",
  );

  /*
   * ----------------------------------------------------------
   * 5. ANTHROPIC PROVIDER -> ALLOW
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[5] Anthropic provider -> ALLOW");

  const anthropic = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "provider:anthropic",
      action: "provider.generate",
    },
  );

  console.log(anthropic);

  assert.equal(
    anthropic.action,
    "allow",
  );

  /*
   * ----------------------------------------------------------
   * 6. GEMINI PROVIDER -> ALLOW
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[6] Gemini provider -> ALLOW");

  const gemini = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "provider:gemini",
      action: "provider.generate",
    },
  );

  console.log(gemini);

  assert.equal(
    gemini.action,
    "allow",
  );

  /*
   * ----------------------------------------------------------
   * 7. UNKNOWN PROVIDER -> DENY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[7] Unknown provider -> DENY");

  const unknownProvider = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "provider:unknown",
      action: "provider.generate",
    },
  );

  console.log(unknownProvider);

  assert.equal(
    unknownProvider.action,
    "deny",
  );

  /*
   * ----------------------------------------------------------
   * 8. INVALID PROVIDER CAPABILITY -> DENY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[8] Invalid provider capability -> DENY");

  const invalidProvider = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "provider:",
      action: "provider.generate",
    },
  );

  console.log(invalidProvider);

  assert.equal(
    invalidProvider.action,
    "deny",
  );

  /*
   * ----------------------------------------------------------
   * 9. REVIEW BOUNDARY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[9] requiresReview -> REVIEW");

  const review = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "echo",
      action: "tool.execute",
      metadata: {
        requiresReview: true,
      },
    },
  );

  console.log(review);

  assert.equal(
    review.action,
    "review",
  );

  /*
   * ----------------------------------------------------------
   * 10. MISSING AGENT ID -> DENY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[10] Missing agent identity -> DENY");

  const missingAgent = check(
    permissions,
    {
      agentId: "",
      tool: "echo",
      action: "tool.execute",
    },
  );

  console.log(missingAgent);

  assert.equal(
    missingAgent.action,
    "deny",
  );

  /*
   * ----------------------------------------------------------
   * 11. UNSUPPORTED ACTION -> DENY
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[11] Unsupported action -> DENY");

  const unsupported = check(
    permissions,
    {
      agentId: "trace-37p-agent",
      tool: "echo",
      action: "something.unknown",
    },
  );

  console.log(unsupported);

  assert.equal(
    unsupported.action,
    "deny",
  );

  /*
   * ----------------------------------------------------------
   * 12. SHARED PERMISSION ENGINE PROVIDER GATE
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[12] Shared PermissionEngine -> ProviderExecutionGateway");

  const context = new RuntimeContext();

  const gateway =
    new ProviderExecutionGateway(
      context,
      undefined,
      undefined,
      permissions,
    );

  console.log(
    "Providers:",
    gateway.list(),
  );

  assert.ok(
    gateway.has("openai"),
    "OpenAI provider must exist.",
  );

  /*
   * We intentionally do not require a real API call here.
   * The capability boundary is verified independently above.
   */

  console.log(
    "Provider gateway construction: PASS",
  );

  /*
   * ----------------------------------------------------------
   * 13. REAL RUNTIME PATH
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[13] REAL AgentRuntime path");

  const runtime =
    new AgentRuntime();

  const agent =
    runtime.create(
      "trace-37p-runtime-agent",
    );

  assert.equal(
    agent.id,
    "trace-37p-runtime-agent",
  );

  const tools =
    runtime
      .getToolRegistry()
      .list()
      .map(tool => tool.name);

  console.log(
    "Runtime tools:",
    tools,
  );

  assert.ok(
    tools.includes("echo"),
    "Echo tool must be available.",
  );

  let runtimeError: unknown = undefined;

  try {

    await runtime.runAgent(
      "trace-37p-runtime-agent",
      "echo provider capability regression",
    );

  } catch (error) {

    runtimeError = error;

    console.log(
      "Runtime execution error:",
      error instanceof Error
        ? error.message
        : String(error),
    );
  }

  /*
   * The runtime may fail later if no provider API key is configured.
   * What must NOT happen is the old:
   *
   * provider:openai -> unknown tool -> BLOCK
   *
   * failure.
   */

  if (runtimeError instanceof Error) {

    assert.ok(
      !runtimeError.message.includes(
        "Access denied for unknown tool: provider:openai"
      ),
      "Provider capability was incorrectly blocked as unknown tool.",
    );
  }

  /*
   * ----------------------------------------------------------
   * 14. DECISION TRACES
   * ----------------------------------------------------------
   */

  console.log("");
  console.log("[14] Decision traces");

  const traces =
    runtime.getDecisionTraces();

  console.log(
    "Trace count:",
    traces.length,
  );

  for (const trace of traces) {

    console.log(
      "Decision:",
      trace.decision,
      "| Action:",
      trace.action,
      "| Risk:",
      trace.riskScore,
      "| Reason:",
      trace.reason,
    );
  }

  assert.ok(
    traces.length > 0,
    "Runtime must produce decision traces.",
  );

  const providerTrace =
    traces.find(
      trace =>
        trace.action === "provider.generate",
    );

  if (providerTrace) {

    assert.notEqual(
      providerTrace.reason,
      "Access denied for unknown tool: provider:openai",
      "Provider was still rejected by old tool policy.",
    );

    console.log(
      "Provider decision trace: PASS",
    );
  }

  console.log("");
  console.log("------------------------------------------------------------");
  console.log("TRACE 37P ASSERTIONS: ALL PASS");
  console.log("------------------------------------------------------------");
  console.log("");
  console.log("TRACE 37P: PASS");
  console.log("");
  console.log("============================================================");
  console.log("TRACE 37P COMPLETE");
  console.log("============================================================");
}

main().catch(error => {

  console.error("");
  console.error("TRACE 37P: FAIL");
  console.error(error);

  process.exit(1);
});
