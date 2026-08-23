/**
 * Security related contracts.
 */

export type SecurityDecision = "ALLOW" | "BLOCK" | "ESCALATE";

export interface SecurityContext {
  /**
   * Agent identifier
   */
  agentId: string;

  /**
   * Request identifier
   */
  requestId: string;

  /**
   * Security risk score
   */
  riskScore?: number;

  /**
   * Additional security metadata
   */
  metadata?: Record<string, unknown>;
}

export interface SecurityResult {
  /**
   * Final decision
   */
  decision: SecurityDecision;

  /**
   * Explanation
   */
  reason: string;

  /**
   * Risk score
   */
  riskScore?: number;
}
