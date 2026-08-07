/**
 * Aegisora Decision Types
 *
 * Defines runtime governance decisions
 * produced by policy and security engines.
 */

export type DecisionStatus = "ALLOW" | "DENY" | "REVIEW";

export interface PolicyResult {
  status: DecisionStatus;

  reason: string;

  riskScore: number;

  signals?: string[];
}

export interface Decision {
  id: string;

  status: DecisionStatus;

  reason: string;

  createdAt: string;
}
