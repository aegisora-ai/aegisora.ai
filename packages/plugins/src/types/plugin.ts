import type { AgentRequest } from "@aegisora/core";

export type PluginType =
  | "SECURITY"
  | "POLICY"
  | "INTEGRATION"
  | "OBSERVABILITY";

export type PluginDecision =
  | "ALLOW"
  | "BLOCK"
  | "ESCALATE";

export type PluginPermission =
  | "READ_CONTEXT"
  | "ANALYZE_REQUEST"
  | "EMIT_AUDIT";

export interface PluginContext {
  readonly pluginName: string;
  readonly pluginVersion: string;
  readonly permissions: readonly PluginPermission[];
}

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
  permissions?: readonly PluginPermission[];

  initialize?(context: PluginContext): Promise<void>;

  analyze?(
    request: AgentRequest,
    context: PluginAnalysisContext,
  ): Promise<PluginAnalysisResult> | PluginAnalysisResult;

  destroy?(): Promise<void>;
}