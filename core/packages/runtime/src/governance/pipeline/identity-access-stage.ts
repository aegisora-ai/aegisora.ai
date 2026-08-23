import {
  PermissionEngine,
} from "../../permissions";

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

  private readonly permissions: PermissionEngine;

  constructor(
    permissions: PermissionEngine =
      new PermissionEngine(),
  ) {
    this.permissions = permissions;
  }

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

    const permission =
      this.permissions.check({
        agentId: intent.agentId,
        resourceType:
          intent.target.type === "provider"
            ? "provider"
            : "tool",
        tool: intent.target.name,
        action: intent.action,
        metadata: intent.metadata,
      });

    if (permission.action === "deny") {
      return {
        decision: "BLOCK",
        reason:
          permission.reason ??
          "Execution permission denied.",
        riskScore: 100,
        metadata: {
          identityVerified: true,
          actorId: intent.actor.id,
          actorType: intent.actor.type,
          permissionDecision: "deny",
          permissionConfidence:
            permission.confidence,
        },
      };
    }

    if (permission.action === "review") {
      return {
        decision: "ESCALATE",
        reason:
          permission.reason ??
          "Execution requires permission review.",
        riskScore: 50,
        metadata: {
          identityVerified: true,
          actorId: intent.actor.id,
          actorType: intent.actor.type,
          permissionDecision: "review",
          permissionConfidence:
            permission.confidence,
        },
      };
    }

    return {
      decision: "ALLOW",

      metadata: {
        identityVerified: true,
        actorId: intent.actor.id,
        actorType: intent.actor.type,
        permissionDecision: "allow",
        permissionConfidence:
          permission.confidence,
      },
    };
  }
}
