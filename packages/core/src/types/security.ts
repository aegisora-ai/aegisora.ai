/**
 * Possible security decisions.
 */
export type SecurityDecision = "ALLOW" | "BLOCK" | "ESCALATE";

/**
 * Policy evaluation output.
 */
export interface PolicyResult {
  decision: SecurityDecision;

  reason: string;

  riskScore: number;

  policyId?: string;

  metadata?: Record<string, unknown>;
}

/**
 * Security analysis output.
 */
export interface SecurityResult {
  decision: SecurityDecision;

  threats: string[];

  confidence: number;

  explanation: string;
}
