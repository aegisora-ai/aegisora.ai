import type { AgentRequest } from "@aegisora/core";

export type PluginType =
  | "SECURITY"
  | "POLICY"
  | "INTEGRATION";

export type PluginDecision =
  | "ALLOW"
  | "BLOCK"
  | "ESCALATE";

export interface PluginAnalysisResult {
  riskScore: number;
  decision: PluginDecision;
  reason: string;
  metadata?: Record<string, unknown>;
}

export interface PluginAnalysisContext {
  requestId: string;
  metadata: Record<string, unknown>;
  signals: string[];
}

export interface AegisoraPlugin {
  name: string;

  version: string;

  type: PluginType;

  initialize?(): Promise<void>;

  analyze?(
    request: AgentRequest,
    context: PluginAnalysisContext,
  ): Promise<PluginAnalysisResult>;

  destroy?(): Promise<void>;
}
