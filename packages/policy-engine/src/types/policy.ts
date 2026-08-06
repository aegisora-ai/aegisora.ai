import type { SecurityDecision } from "@aegisora/core";

export interface PolicyContext {
  agentId: string;

  action: string;

  input?: unknown;
}

export interface PolicyEvaluation {
  decision: SecurityDecision;

  reason: string;

  riskScore: number;
}
