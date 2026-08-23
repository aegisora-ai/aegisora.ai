export type GovernanceDecision =
  | "ALLOW"
  | "BLOCK"
  | "ESCALATE";

export type GovernanceRiskLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface GovernanceThreat {
  type: string;

  severity:
    | "low"
    | "medium"
    | "high"
    | "critical";

  description: string;

  score: number;
}

export interface GovernanceDecisionResult {
  decision: GovernanceDecision;

  reason: string;

  riskScore: number;

  riskLevel: GovernanceRiskLevel;

  threats: GovernanceThreat[];

  intentId: string;

  evaluatedAt: Date;

  metadata: Record<string, unknown>;
}
