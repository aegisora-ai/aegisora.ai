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
  SecurityGuard,
} from "../../security/security-guard";

export class SecurityAnalysisStage
  implements GovernanceStage {

  readonly id = "security-analysis";

  readonly name = "Security Analysis";

  readonly order = 30;

  private readonly securityGuard: SecurityGuard;

  constructor(
    securityGuard: SecurityGuard = new SecurityGuard(),
  ) {
    this.securityGuard = securityGuard;
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
      this.securityGuard.check(event);

    if (
      result.decision === "block"
    ) {
      return {
        decision: "BLOCK",

        reason:
          result.reason ??
          "Security guard blocked execution.",

        riskScore: 90,

        metadata: {
          securityDecision: "block",

          securityReason:
            result.reason,
        },
      };
    }

    return {
      decision: "ALLOW",

      metadata: {
        securityDecision: "allow",

        securityReason:
          result.reason,
      },
    };
  }
}
