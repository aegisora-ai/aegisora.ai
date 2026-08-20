import assert from "node:assert/strict";

import {
  PluginRegistry,
  PluginLoader,
} from "@aegisora/plugins";

import {
  PluginsMiddleware,
} from "../src/middleware/plugins";

async function main() {
  console.log("");
  console.log("============================================================");
  console.log("TRACE 35 — PLUGIN GOVERNANCE ENFORCEMENT");
  console.log("============================================================");

  const registry = new PluginRegistry();
  const loader = new PluginLoader(registry);

  let initialized = false;
  let destroyed = false;

  const safePlugin = {
    name: "trace-35-safe",
    version: "1.0.0",
    type: "SECURITY" as const,

    async initialize() {
      initialized = true;
    },

    async analyze() {
      return {
        riskScore: 20,
        decision: "ALLOW" as const,
        reason: "Safe plugin analysis passed",
      };
    },

    async destroy() {
      destroyed = true;
    },
  };

  const blockPlugin = {
    name: "trace-35-block",
    version: "1.0.0",
    type: "SECURITY" as const,

    async analyze() {
      return {
        riskScore: 95,
        decision: "BLOCK" as const,
        reason: "Trace 35 malicious payload detected",
        metadata: {
          detector: "trace-35",
        },
      };
    },
  };

  const escalationPlugin = {
    name: "trace-35-escalate",
    version: "1.0.0",
    type: "POLICY" as const,

    async analyze() {
      return {
        riskScore: 75,
        decision: "ESCALATE" as const,
        reason: "Human review required",
      };
    },
  };

  console.log("");
  console.log("[A] Loading safe plugin...");

  await loader.load(safePlugin);

  assert.equal(initialized, true);
  assert.equal(registry.has("trace-35-safe"), true);

  console.log("Plugin initialization: PASS");

  console.log("");
  console.log("[B] Safe plugin governance...");

  const middleware =
    new PluginsMiddleware(registry);

  const safeContext =
    await middleware.execute({
      request: {
        agentId: "trace-35-agent",
        action: "tool.execute",
        tool: "echo",
        input: {},
      } as any,

      requestId: "trace-35-request-safe",
      metadata: {},
      blocked: false,
      riskScore: 0,
      signals: [],
    });

  assert.equal(safeContext.blocked, false);
  assert.equal(safeContext.riskScore, 20);

  const safeSummary =
    safeContext.metadata.pluginGovernance as any;

  assert.equal(
    safeSummary.decision,
    "ALLOW",
  );

  console.log("Safe plugin ALLOW: PASS");

  console.log("");
  console.log("[C] Loading escalation plugin...");

  await loader.load(escalationPlugin);

  const escalationContext =
    await middleware.execute({
      request: {
        agentId: "trace-35-agent",
        action: "tool.execute",
        tool: "echo",
        input: {},
      } as any,

      requestId: "trace-35-request-escalate",
      metadata: {},
      blocked: false,
      riskScore: 0,
      signals: [],
    });

  const escalationSummary =
    escalationContext.metadata.pluginGovernance as any;

  assert.equal(
    escalationSummary.decision,
    "ESCALATE",
  );

  assert.equal(
    escalationSummary.riskScore,
    75,
  );

  assert.ok(
    escalationContext.signals.includes(
      "PLUGIN_ESCALATION_REQUIRED",
    ),
  );

  console.log(
    "Plugin ESCALATE aggregation: PASS",
  );

  console.log("");
  console.log("[D] Loading blocking plugin...");

  await loader.load(blockPlugin);

  const blockedContext =
    await middleware.execute({
      request: {
        agentId: "trace-35-agent",
        action: "tool.execute",
        tool: "shell",
        input: {},
      } as any,

      requestId: "trace-35-request-block",
      metadata: {},
      blocked: false,
      riskScore: 0,
      signals: [],
    });

  const blockedSummary =
    blockedContext.metadata.pluginGovernance as any;

  assert.equal(
    blockedContext.blocked,
    true,
  );

  assert.equal(
    blockedSummary.decision,
    "BLOCK",
  );

  assert.equal(
    blockedSummary.riskScore,
    95,
  );

  assert.ok(
    blockedContext.signals.includes(
      "PLUGIN_GOVERNANCE_BLOCKED",
    ),
  );

  console.log(
    "Plugin BLOCK enforcement: PASS",
  );

  console.log("");
  console.log(
    "[E] Testing plugin failure fail-closed behavior...",
  );

  const failingPlugin = {
    name: "trace-35-failing",
    version: "1.0.0",
    type: "SECURITY" as const,

    async analyze() {
      throw new Error(
        "TRACE 35 intentional plugin failure",
      );
    },
  };

  await loader.load(failingPlugin);

  const failedContext =
    await middleware.execute({
      request: {
        agentId: "trace-35-agent",
        action: "tool.execute",
        tool: "echo",
        input: {},
      } as any,

      requestId: "trace-35-request-failure",
      metadata: {},
      blocked: false,
      riskScore: 0,
      signals: [],
    });

  const failedSummary =
    failedContext.metadata.pluginGovernance as any;

  assert.equal(
    failedContext.blocked,
    true,
  );

  const failureResult =
    failedSummary.results.find(
      (result: any) =>
        result.plugin === "trace-35-failing",
    );

  assert.ok(failureResult);

  assert.equal(
    failureResult.decision,
    "BLOCK",
  );

  assert.equal(
    failureResult.riskScore,
    100,
  );

  assert.equal(
    failureResult.metadata.pluginFailure,
    true,
  );

  console.log(
    "Plugin failure fail-closed: PASS",
  );

  console.log("");
  console.log(
    "[F] Testing plugin lifecycle destruction...",
  );

  assert.equal(
    await loader.unload("trace-35-safe"),
    true,
  );

  assert.equal(
    destroyed,
    true,
  );

  assert.equal(
    registry.has("trace-35-safe"),
    false,
  );

  console.log(
    "Plugin destruction: PASS",
  );

  console.log("");
  console.log(
    "[G] Verifying plugin metadata and signals...",
  );

  assert.equal(
    typeof blockedContext.metadata.pluginGovernance,
    "object",
  );

  assert.ok(
    blockedContext.signals.some(
      (signal) =>
        signal.startsWith(
          "PLUGIN:trace-35-block:BLOCK",
        ),
    ),
  );

  console.log(
    "Plugin observability surface: PASS",
  );

  console.log("");
  console.log(
    "============================================================",
  );
  console.log(
    "TRACE 35 PLUGIN GOVERNANCE: PASS",
  );
  console.log(
    "============================================================",
  );
}

main().catch((error) => {
  console.error("");
  console.error(
    "TRACE 35 PLUGIN GOVERNANCE: FAIL",
  );
  console.error(error);
  process.exit(1);
});
