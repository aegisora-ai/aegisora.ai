/**
 * Canonical evidence contracts for Aegisora 1.5.
 *
 * This module contains shared data contracts only.
 *
 * @aegisora/core must remain independent from runtime implementation.
 */

import type {
  CanonicalDecision,
  CanonicalResourceType,
  EnforcementStatus,
  ExecutionOutcome,
  DecisionThreat,
} from "./runtime-decision";

export type EvidenceType =
  | "decision"
  | "enforcement"
  | "audit";

export type EvidenceStatus =
  | "recorded"
  | "verified";

export interface EvidenceRecord {
  /**
   * Unique evidence identity.
   */
  evidenceId: string;

  /**
   * Correlation identity for the complete runtime flow.
   */
  traceId: string;

  /**
   * Unique governance decision identity.
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
   * Optional tool identity.
   */
  toolId?: string;

  /**
   * Optional tool name.
   */
  tool?: string;

  /**
   * Requested action.
   */
  action: string;

  /**
   * Final runtime governance decision.
   */
  finalDecision: CanonicalDecision;

  /**
   * Actual enforcement outcome.
   */
  enforcementStatus: EnforcementStatus;

  /**
   * Actual execution result.
   */
  executionOutcome?: ExecutionOutcome;

  /**
   * Human-readable reason.
   */
  reason: string;

  /**
   * Runtime risk score.
   */
  riskScore: number;

  /**
   * Associated threats.
   */
  threats: DecisionThreat[];

  /**
   * Evidence category.
   */
  type: EvidenceType;

  /**
   * Lifecycle state of this evidence record.
   */
  status: EvidenceStatus;

  /**
   * Creation timestamp.
   */
  timestamp: Date;

  /**
   * Optional additional metadata.
   */
  metadata?: Record<string, unknown>;
}
