/**
 * Aegisora Core
 *
 * Fundamental contracts shared across
 * runtime, security, policy and SDK layers.
 */

/**
 * Represents an incoming AI agent request.
 */
export interface AgentRequest {
  id: string;

  agentId: string;

  action: string;

  input: unknown;

  timestamp: Date;

  metadata?: Record<string, unknown>;
}

/**
 * Runtime execution context.
 *
 * Contains information required
 * to evaluate an agent action.
 */
export interface RuntimeContext {
  requestId: string;

  agentId: string;

  userId?: string;

  environment: "development" | "production";

  permissions?: string[];

  metadata?: Record<string, unknown>;
}

/**
 * Security decision produced
 * by Aegisora governance layer.
 */
export type SecurityDecision = "ALLOW" | "BLOCK" | "ESCALATE";

/**
 * Result returned by policy evaluation.
 */
export interface PolicyResult {
  decision: SecurityDecision;

  reason: string;

  riskScore: number;

  policyId?: string;

  metadata?: Record<string, unknown>;
}

/**
 * Security evaluation result.
 */
export interface SecurityResult {
  decision: SecurityDecision;

  threats: string[];

  confidence: number;

  explanation: string;
}
