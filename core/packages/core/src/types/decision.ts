/**
 * Aegisora decision contracts.
 *
 * The public decision vocabulary is intentionally aligned with the
 * runtime governance boundary: ALLOW, BLOCK, or ESCALATE.
 */

export type DecisionStatus = "ALLOW" | "BLOCK" | "ESCALATE";

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
