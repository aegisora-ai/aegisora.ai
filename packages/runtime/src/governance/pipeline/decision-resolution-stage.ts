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

export class DecisionResolutionStage
  implements GovernanceStage {

  readonly id = "decision-resolution";

  readonly name = "Decision Resolution";

  readonly order = 60;

  async evaluate(
    _intent: ExecutionIntent,
    _context: GovernanceContext,
  ): Promise<GovernanceStageResult> {

    return {
      decision: "ALLOW",

      reason:
        "All governance checks passed.",
    };
  }
}
