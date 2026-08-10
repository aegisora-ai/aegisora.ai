import type {
  ExecutionIntent,
} from "../types/execution-intent";

import type {
  GovernanceContext,
} from "../types/governance-context";

import type {
  GovernanceDecisionResult,
} from "../decision/governance-decision";

export interface GovernanceStageResult {
  decision?: GovernanceDecisionResult["decision"];

  reason?: string;

  riskScore?: number;

  metadata?: Record<string, unknown>;
}

export interface GovernanceStage {
  readonly id: string;

  readonly name: string;

  readonly order: number;

  evaluate(
    intent: ExecutionIntent,
    context: GovernanceContext,
  ): Promise<GovernanceStageResult>;
}
