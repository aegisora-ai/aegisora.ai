/**
 * Canonical runtime decision contract for Aegisora 1.5.
 *
 * IMPORTANT ARCHITECTURE RULE:
 *
 * @aegisora/core must remain independent from @aegisora/runtime.
 * Core owns shared contracts.
 * Runtime may depend on core, but core must never depend on runtime.
 */

export type CanonicalDecision =
  | "ALLOW"
  | "BLOCK"
  | "ESCALATE";

export type CanonicalResourceType =
  | "agent"
  | "tool"
  | "provider";

export type CanonicalPermissionDecision =
  | "allow"
  | "deny"
  | "review";

export type CanonicalDecisionState =
  | "allow"
  | "block"
  | "escalate";

export type EnforcementStatus =
  | "not_executed"
  | "executed"
  | "prevented"
  | "escalated";

export type ExecutionOutcome =
  | "not_attempted"
  | "succeeded"
  | "failed";

/**
 * Shared threat contract.
 *
 * This intentionally lives in @aegisora/core so that core contracts
 * do not import runtime implementation types.
 */
export interface DecisionThreat {
  type: string;
  severity: string;
  description: string;
  score: number;
}

export interface RuntimeDecisionRecord {
  /**
   * Correlation identity for the complete runtime flow.
   */
  traceId: string;

  /**
   * Unique decision identity.
   */
  decisionId: string;

  /**
   * Execution correlation identity.
   */
  executionId: string;

  /**
   * Canonical agent identity.
   */
  agentId: string;

  /**
   * Governed resource category.
   */
  resourceType: CanonicalResourceType;

  /**
   * Canonical tool identity when available.
   */
  toolId?: string;

  /**
   * Human-readable tool name.
   */
  tool?: string;

  /**
   * Requested action.
   */
  action: string;

  /**
   * Policy identity when available.
   */
  policyId?: string;

  /**
   * Result of policy evaluation.
   */
  policyDecision: CanonicalDecisionState;

  /**
   * Result of security evaluation.
   */
  securityDecision: CanonicalDecisionState;

  /**
   * Result of permission evaluation.
   */
  permissionDecision: CanonicalPermissionDecision;

  /**
   * Final governance decision.
   */
  finalDecision: CanonicalDecision;

  /**
   * Human-readable decision reason.
   */
  reason: string;

  /**
   * Runtime risk score.
   */
  riskScore: number;

  /**
   * Security and risk threats associated with the decision.
   */
  threats: DecisionThreat[];

  /**
   * Actual execution outcome.
   */
  enforcementStatus: EnforcementStatus;

  /**
   * Actual execution result, independent of governance decision.
   *
   * not_attempted:
   *   The enforcement decision prevented or deferred execution.
   *
   * succeeded:
   *   The governed operation completed successfully.
   *
   * failed:
   *   The governed operation reached execution but failed.
   */
  executionOutcome?: ExecutionOutcome;

  /**
   * Evidence identity when evidence has been emitted.
   */
  evidenceId?: string;

  /**
   * Decision timestamp.
   */
  timestamp: Date;

  /**
   * Additional correlation or runtime metadata.
   */
  metadata?: Record<string, unknown>;
}
