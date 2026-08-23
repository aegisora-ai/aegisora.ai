import type {
  RuntimeMiddleware,
  RuntimeMiddlewareContext,
} from "../types/middleware";

import {
  PluginRegistry,
  type PluginAnalysisResult,
} from "@aegisora/plugins";

export interface PluginGovernanceResult {
  plugin: string;
  version: string;
  type: string;
  decision: PluginAnalysisResult["decision"];
  riskScore: number;
  reason: string;
  metadata?: Record<string, unknown>;
}

export interface PluginGovernanceSummary {
  decision: PluginAnalysisResult["decision"];
  riskScore: number;
  reason: string;
  results: PluginGovernanceResult[];
}

function decisionRank(
  decision: PluginAnalysisResult["decision"],
): number {
  switch (decision) {
    case "BLOCK":
      return 3;

    case "ESCALATE":
      return 2;

    case "ALLOW":
      return 1;

    default:
      return 0;
  }
}

function clampRiskScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 100;
  }

  return Math.max(0, Math.min(100, value));
}

export class PluginsMiddleware implements RuntimeMiddleware {
  name = "plugins";

  constructor(
    private readonly registry: PluginRegistry = new PluginRegistry(),
  ) {}

  getRegistry(): PluginRegistry {
    return this.registry;
  }

  async execute(
    context: RuntimeMiddlewareContext,
  ): Promise<RuntimeMiddlewareContext> {
    const plugins = this.registry.list();

    context.signals.push(
      plugins.length > 0
        ? `PLUGINS_EXECUTED:${plugins.length}`
        : "PLUGINS_EXECUTED:0",
    );

    if (plugins.length === 0) {
      return context;
    }

    const results: PluginGovernanceResult[] = [];

    for (const plugin of plugins) {
      if (!plugin.analyze) {
        context.signals.push(
          `PLUGIN_SKIPPED:${plugin.name}:NO_ANALYZER`,
        );

        continue;
      }

      try {
        const result = await plugin.analyze(
          context.request,
          {
            requestId: context.requestId,
            metadata: context.metadata,
            signals: context.signals,
          },
        );

        results.push({
          plugin: plugin.name,
          version: plugin.version,
          type: plugin.type,
          decision: result.decision,
          riskScore: clampRiskScore(result.riskScore),
          reason: result.reason,
          metadata: result.metadata,
        });
      } catch (error) {
        const reason =
          `Plugin execution failed: ${plugin.name}: ` +
          `${error instanceof Error ? error.message : String(error)}`;

        results.push({
          plugin: plugin.name,
          version: plugin.version,
          type: plugin.type,
          decision: "BLOCK",
          riskScore: 100,
          reason,
          metadata: {
            pluginFailure: true,
          },
        });
      }
    }

    if (results.length === 0) {
      return context;
    }

    const strongest = results.reduce(
      (current, next) =>
        decisionRank(next.decision) >
        decisionRank(current.decision)
          ? next
          : current,
    );

    const riskScore = results.reduce(
      (max, result) =>
        Math.max(max, result.riskScore),
      0,
    );

    context.riskScore = Math.max(
      context.riskScore,
      riskScore,
    );

    context.metadata.pluginGovernance = {
      decision: strongest.decision,
      riskScore,
      reason: strongest.reason,
      results,
    } satisfies PluginGovernanceSummary;

    for (const result of results) {
      context.signals.push(
        `PLUGIN:${result.plugin}:${result.decision}:${result.riskScore}`,
      );
    }

    if (strongest.decision === "BLOCK") {
      context.blocked = true;
      context.signals.push(
        "PLUGIN_GOVERNANCE_BLOCKED",
      );
    }

    if (strongest.decision === "ESCALATE") {
      context.signals.push(
        "PLUGIN_ESCALATION_REQUIRED",
      );
    }

    return context;
  }
}
