import type {
  ExecutionIntent,
} from "../types/execution-intent";

import type {
  GovernanceContext,
} from "../types/governance-context";

import type {
  GovernanceStage,
  GovernanceStageResult,
} from "./governance-stage";

import {
  RiskEngine,
} from "../../security/risk-engine";

export class RiskAnalysisStage
  implements GovernanceStage {

  readonly id = "risk-analysis";

  readonly name = "Risk Analysis";

  readonly order = 50;

  private readonly riskEngine: RiskEngine;

  constructor(
    riskEngine: RiskEngine =
      new RiskEngine(),
  ) {
    this.riskEngine = riskEngine;
  }

  async evaluate(
    intent: ExecutionIntent,
    context: GovernanceContext,
  ): Promise<GovernanceStageResult> {

    const event = {
      id: intent.id,

      type: "tool.called" as const,

      agentId: intent.agentId,

      timestamp: new Date(),

      payload: {
        action: intent.action,

        tool:
          intent.target.name,

        input:
          intent.input,

        metadata:
          intent.metadata,
      },
    };

    const result =
      this.riskEngine.analyze(event);

    if (!result) {
      return {
        decision: "ALLOW",

        riskScore: 0,
      };
    }

    const riskScore =
      result.level === "high"
        ? 90
        : result.level === "medium"
          ? 50
          : 10;

    return {
      decision:
        result.level === "high"
          ? "ESCALATE"
          : "ALLOW",

      reason:
        result.reason,

      riskScore,

      metadata: {
        riskLevel:
          result.level,

        riskReason:
          result.reason,
      },
    };
  }
}
