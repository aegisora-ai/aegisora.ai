import type {
  ExecutionIntent,
} from "./types/execution-intent";

import type {
  GovernanceContext,
} from "./types/governance-context";

import type {
  GovernanceDecisionResult,
} from "./decision/governance-decision";

import type {
  GovernanceStage,
  GovernanceStageResult,
} from "./pipeline/governance-stage";

import {
  ContextResolutionStage,
  IdentityAccessStage,
  SecurityAnalysisStage,
  PolicyEvaluationStage,
  RiskAnalysisStage,
  DecisionResolutionStage,
  AuditEvidenceStage,
} from "./pipeline";

export class GovernanceEngine {

  private readonly stages: GovernanceStage[];

  constructor(
    stages?: GovernanceStage[],
  ) {
    this.stages =
      stages ??
      [
        new ContextResolutionStage(),
        new IdentityAccessStage(),
        new SecurityAnalysisStage(),
        new PolicyEvaluationStage(),
        new RiskAnalysisStage(),
        new DecisionResolutionStage(),
        new AuditEvidenceStage(),
      ].sort(
        (a, b) =>
          a.order - b.order,
      );
  }

  listStages(): string[] {
    return this.stages.map(
      (stage) =>
        stage.id,
    );
  }

  async evaluate(
    intent: ExecutionIntent,
    context: GovernanceContext,
  ): Promise<GovernanceDecisionResult> {

    const startedAt =
      new Date();

    const stageResults:
      Array<{
        stage: string;
        order: number;
        result: GovernanceStageResult;
      }> = [];

    let finalDecision:
      GovernanceDecisionResult["decision"] =
        "ALLOW";

    let finalReason =
      "All governance checks passed.";

    let riskScore = 0;

    for (
      const stage of this.stages
    ) {

      const result =
        await stage.evaluate(
          intent,
          context,
        );

      stageResults.push({
        stage: stage.id,
        order: stage.order,
        result,
      });

      if (
        result.riskScore !== undefined
      ) {
        riskScore =
          Math.max(
            riskScore,
            result.riskScore,
          );
      }

      if (
        result.decision === "BLOCK"
      ) {
        finalDecision =
          "BLOCK";

        finalReason =
          result.reason ??
          `Blocked by stage: ${stage.id}`;

        break;
      }

      if (
        result.decision === "ESCALATE"
      ) {
        finalDecision =
          "ESCALATE";

        finalReason =
          result.reason ??
          `Escalation required by stage: ${stage.id}`;
      }
    }

    const riskLevel =
      riskScore >= 90
        ? "CRITICAL"
        : riskScore >= 70
          ? "HIGH"
          : riskScore >= 40
            ? "MEDIUM"
            : "LOW";

    const evaluatedAt =
      new Date();

    return {
      decision:
        finalDecision,

      reason:
        finalReason,

      riskScore,

      riskLevel,

      threats: [],

      intentId:
        intent.id,

      evaluatedAt,

      metadata: {
        startedAt,

        stages:
          stageResults,

        stageCount:
          stageResults.length,

        pipeline:
          this.listStages(),
      },
    };
  }
}
