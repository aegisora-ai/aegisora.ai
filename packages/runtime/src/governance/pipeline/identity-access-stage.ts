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

export class IdentityAccessStage
  implements GovernanceStage {

  readonly id = "identity-access";

  readonly name = "Identity and Access";

  readonly order = 20;

  async evaluate(
    intent: ExecutionIntent,
    _context: GovernanceContext,
  ): Promise<GovernanceStageResult> {

    if (
      !intent.actor.id ||
      !intent.actor.type
    ) {
      return {
        decision: "BLOCK",
        reason: "Execution identity is missing.",
        riskScore: 100,
      };
    }

    return {
      decision: "ALLOW",

      metadata: {
        identityVerified: true,
        actorId: intent.actor.id,
        actorType: intent.actor.type,
      },
    };
  }
}
