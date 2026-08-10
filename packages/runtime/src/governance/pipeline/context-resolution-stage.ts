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

export class ContextResolutionStage
  implements GovernanceStage {

  readonly id = "context-resolution";

  readonly name = "Context Resolution";

  readonly order = 10;

  async evaluate(
    intent: ExecutionIntent,
    context: GovernanceContext,
  ): Promise<GovernanceStageResult> {

    return {
      decision: "ALLOW",

      metadata: {
        intentId: intent.id,
        actorId: intent.actor.id,
        targetType: intent.target.type,
        targetName: intent.target.name,
        contextResolved: true,
        contextKeys: Object.keys(context),
      },
    };
  }
}
