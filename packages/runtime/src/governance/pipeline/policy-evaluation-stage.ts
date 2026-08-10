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
  RuntimePolicyEngine,
} from "../../policy/policy-engine";

export class PolicyEvaluationStage
  implements GovernanceStage {

  readonly id = "policy-evaluation";

  readonly name = "Policy Evaluation";

  readonly order = 40;

  private readonly policyEngine: RuntimePolicyEngine;

  constructor(
    policyEngine: RuntimePolicyEngine =
      new RuntimePolicyEngine(),
  ) {
    this.policyEngine = policyEngine;
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
      this.policyEngine.evaluate(event);

    if (!result.allowed) {
      return {
        decision: "BLOCK",

        reason:
          result.reason ??
          "Policy engine blocked execution.",

        riskScore: 100,

        metadata: {
          policyDecision: "block",

          policyReason:
            result.reason,
        },
      };
    }

    return {
      decision: "ALLOW",

      metadata: {
        policyDecision: "allow",

        policyReason:
          result.reason,
      },
    };
  }
}
