/**
 * Aegisora Runtime Context Analyzer
 *
 * Analyzes incoming agent requests
 * before security and policy evaluation.
 */

import type { AgentRequest } from "@aegisora/core";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface AnalyzedContext {
  requestId: string;

  agentId: string;

  action: string;

  riskLevel: RiskLevel;

  suspicious: boolean;

  signals: string[];
}

export class ContextAnalyzer {
  analyze(request: AgentRequest): AnalyzedContext {
    const signals: string[] = [];

    let riskLevel: RiskLevel = "LOW";

    const action = request.action.toLowerCase();

    const highRiskActions = ["delete", "remove", "drop", "shutdown", "execute"];

    if (highRiskActions.some((keyword) => action.includes(keyword))) {
      riskLevel = "HIGH";

      signals.push("Potentially destructive action detected");
    }

    if (
      action.includes("api") ||
      action.includes("http") ||
      action.includes("request")
    ) {
      if (riskLevel === "LOW") {
        riskLevel = "MEDIUM";
      }

      signals.push("External system interaction detected");
    }

    return {
      requestId: request.id,

      agentId: request.agentId,

      action: request.action,

      riskLevel,

      suspicious: signals.length > 0,

      signals,
    };
  }
}
