import { RuntimeContext } from "../context/runtime-context";
import type { RuntimeEvent } from "../events";
import { PermissionEngine } from "../permissions";

import type {
  EnforcementRequest,
  EnforcementResult,
  EnforcementThreat,
  EnforcementAuditRecord,
} from "./types";

export class EnforcementGate {

  private readonly context: RuntimeContext;
  private readonly permissions: PermissionEngine;

  constructor(
    context?: RuntimeContext,
    permissions?: PermissionEngine,
  ) {
    this.context =
      context ?? new RuntimeContext();

    this.permissions =
      permissions ?? new PermissionEngine();
  }

  async enforce(
    request: EnforcementRequest,
  ): Promise<EnforcementResult> {

    const traceId =
      crypto.randomUUID();

    const decisionId =
      crypto.randomUUID();

    const executionId =
      crypto.randomUUID();

    const evidenceId =
      crypto.randomUUID();

    const correlationId =
      traceId;

    const metadata = {
      ...(request.metadata ?? {}),
      action: request.action,
      canonicalTool: request.tool,
      correlationId,
      traceId,
      decisionId,
      executionId,
      evidenceId,
    };

    const registeredAgent =
      this.context.agentRegistry.getById(
        request.agentId,
      );

    if (!registeredAgent) {
      return this.complete(
        request,
        metadata,
        {
          decision: "BLOCK",
          reason:
            `Unknown or unregistered agent identity: ${request.agentId}`,
          riskScore: 100,
          threats: [],
          permission: "deny",
          policy: "allow",
          security: "allow",
        },
        "prevented",
        "not_attempted",
      );
    }

    const permission =
      this.permissions.check({
        agentId: request.agentId,
        resourceType: request.resourceType,
        tool: request.tool,
        action: request.action,
        metadata,
      });

    if (
      permission.action === "deny"
    ) {
      return this.complete(
        request,
        metadata,
        {
          decision: "BLOCK",
          reason: permission.reason,
          riskScore: 100,
          threats: [],
          permission: "deny",
          policy: "allow",
          security: "allow",
        },
        "prevented",
        "not_attempted",
      );
    }

    const event: RuntimeEvent = {
      id: crypto.randomUUID(),
      type:
        request.resourceType === "provider"
          ? "provider.called"
          : request.resourceType === "agent"
            ? "agent.called"
            : "tool.called",
      agentId: request.agentId,
      timestamp: new Date(),
      metadata,
      payload: {
        tool: request.tool,
        action: request.action,
        input: request.input,
        metadata,
      },
    };

    this.context.eventBus.emit(event);

    const policyResult =
      this.context.policy.evaluate(
        event,
      );

    if (!policyResult.allowed) {
      return this.complete(
        request,
        metadata,
        {
          decision: "BLOCK",
          reason: policyResult.reason,
          riskScore: 100,
          threats: [],
          permission: permission.action,
          policy: "block",
          security: "allow",
        },
        "prevented",
        "not_attempted",
      );
    }

    const securityResult =
      this.context.security.check(
        event,
      );

    const securityDecision =
      securityResult.decision === "block"
        ? "block"
        : "allow";

    const threats:
      EnforcementThreat[] = [];

    if (
      securityDecision === "block"
    ) {
      threats.push({
        type: "security_violation",
        severity: "high",
        description:
          securityResult.reason,
        score: 90,
      });
    }

    const riskSignal =
      this.context.risk.analyze(event);

    let riskScore = 0;

    if (riskSignal?.level === "low") {
      riskScore = 10;
    } else if (
      riskSignal?.level === "medium"
    ) {
      riskScore = 50;
    } else if (
      riskSignal?.level === "high"
    ) {
      riskScore = 90;
    }

    if (riskSignal) {
      threats.push({
        type: "risk_signal",
        severity: riskSignal.level,
        description: riskSignal.reason,
        score: riskScore,
      });
    }

    if (
      securityDecision === "block"
    ) {
      return this.complete(
        request,
        metadata,
        {
          decision: "BLOCK",
          reason: securityResult.reason,
          riskScore: Math.max(
            riskScore,
            90,
          ),
          threats,
          permission: permission.action,
          policy: "allow",
          security: "block",
        },
        "prevented",
        "not_attempted",
      );
    }

    if (
      permission.action === "review"
    ) {
      return this.complete(
        request,
        metadata,
        {
          decision: "ESCALATE",
          reason:
            "Execution requires permission review.",
          riskScore: Math.max(
            riskScore,
            50,
          ),
          threats,
          permission: "review",
          policy: "allow",
          security: "allow",
        },
        "escalated",
        "not_attempted",
      );
    }

    return this.complete(
      request,
      metadata,
      {
        decision: "ALLOW",
        reason:
          "Permission, policy, security and risk checks passed.",
        riskScore,
        threats,
        permission: permission.action,
        policy: "allow",
        security: "allow",
      },
      "not_executed",
      "not_attempted",
    );
  }

  async evaluate(
    request: EnforcementRequest,
  ): Promise<EnforcementResult> {
    return this.enforce(request);
  }

  private async complete(
    request: EnforcementRequest,
    metadata: Record<string, unknown>,
    base: Omit<
      EnforcementResult,
      | "traceId"
      | "decisionId"
      | "executionId"
      | "evidenceId"
      | "enforcementStatus"
      | "executionOutcome"
    >,
    enforcementStatus:
      | "not_executed"
      | "executed"
      | "prevented"
      | "escalated",
    executionOutcome:
      | "not_attempted"
      | "succeeded"
      | "failed",
  ): Promise<EnforcementResult> {

    const traceId =
      String(metadata.traceId);

    const decisionId =
      String(metadata.decisionId);

    const executionId =
      String(metadata.executionId);

    const evidenceId =
      String(metadata.evidenceId);

    const result: EnforcementResult = {
      ...base,
      traceId,
      decisionId,
      executionId,
      evidenceId,
      enforcementStatus,
      executionOutcome,
    };

    await this.audit(
      request,
      result,
      metadata,
    );

    return result;
  }

  private async audit(
    request: EnforcementRequest,
    result: EnforcementResult,
    metadata: Record<string, unknown>,
  ): Promise<void> {

    const auditRecord:
      EnforcementAuditRecord = {
        agentId: request.agentId,
        resourceType:
          request.resourceType,
        tool: request.tool,
        action: request.action,
        decision: result.decision,
        reason: result.reason,
        riskScore: result.riskScore,
        threats: result.threats,
        metadata,
      };

    this.context.decisionStore.record({
      id: result.decisionId,

      agentId:
        auditRecord.agentId,

      action:
        auditRecord.action,

      decision:
        auditRecord.decision.toLowerCase() as
          | "allow"
          | "block"
          | "escalate",

      reason:
        auditRecord.reason,

      timestamp:
        new Date(),

      riskScore:
        auditRecord.riskScore,

      traceId:
        result.traceId,

      decisionId:
        result.decisionId,

      executionId:
        result.executionId,

      evidenceId:
        result.evidenceId,

      enforcementStatus:
        result.enforcementStatus,

      executionOutcome:
        result.executionOutcome,

      metadata: {
        resourceType:
          auditRecord.resourceType,

        tool:
          auditRecord.tool,

        threats:
          auditRecord.threats,

        ...(auditRecord.metadata ?? {}),
      },
    });

    this.context.evidenceStore.record({
      evidenceId:
        result.evidenceId,

      traceId:
        result.traceId,

      decisionId:
        result.decisionId,

      executionId:
        result.executionId,

      agentId:
        request.agentId,

      resourceType:
        request.resourceType,

      tool:
        request.tool,

      action:
        request.action,

      finalDecision:
        result.decision,

      enforcementStatus:
        result.enforcementStatus,

      executionOutcome:
        result.executionOutcome,

      reason:
        result.reason,

      riskScore:
        result.riskScore,

      threats:
        result.threats,

      type:
        "enforcement",

      status:
        "recorded",

      timestamp:
        new Date(),

      metadata,
    });
  }
}
