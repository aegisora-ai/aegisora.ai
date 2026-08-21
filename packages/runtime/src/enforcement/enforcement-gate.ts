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
    this.context = context ?? new RuntimeContext();
    this.permissions = permissions ?? new PermissionEngine();
  }

  /**
   * Primary enforcement API.
   *
   * Enforcement order:
   * permission -> policy -> security -> risk -> audit
   */
  async enforce(
    request: EnforcementRequest,
  ): Promise<EnforcementResult> {
    const correlationId = crypto.randomUUID();

    const metadata = {
      ...(request.metadata ?? {}),
      action: request.action,
      canonicalTool: request.tool,
      correlationId,
    };

        // --------------------------------------------------------
    // 1. Identity authenticity
    // --------------------------------------------------------
    //
    // RuntimeContext.AgentRegistry is the canonical source
    // of runtime agent identity.
    //
    // Possessing an agentId string is NOT sufficient.
    // The identity must correspond to a registered runtime agent.
    //
    // This check executes before permission, policy, security,
    // risk analysis, and provider/tool execution.
    // --------------------------------------------------------

    const registeredAgent =
      this.context.agentRegistry.getById(
        request.agentId,
      );

    if (!registeredAgent) {
      const result: EnforcementResult = {
        decision: "BLOCK",
        reason:
          `Unknown or unregistered agent identity: ${request.agentId}`,
        riskScore: 100,
        threats: [],
        permission: "deny",
        policy: "allow",
        security: "allow",
      };

      await this.audit(request, result, metadata);
      return result;
    }

    // --------------------------------------------------------
    // 2. Identity / access control
    // --------------------------------------------------------

    const permission = this.permissions.check({
      agentId: request.agentId,
      resourceType: request.resourceType,
      tool: request.tool,
      action: request.action,
      metadata,
    });

    if (permission.action === "deny") {
      const result: EnforcementResult = {
        decision: "BLOCK",
        reason: permission.reason,
        riskScore: 100,
        threats: [],
        permission: "deny",
        policy: "allow",
        security: "allow",
      };

      await this.audit(request, result, metadata);
      return result;
    }

    // --------------------------------------------------------
    // 2. Canonical runtime event
    // --------------------------------------------------------

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
    // Canonical evidence emission occurs at the enforcement boundary.
    this.context.eventBus.emit(event);

    // --------------------------------------------------------
    // 3. Policy enforcement
    // --------------------------------------------------------

    const policyResult = this.context.policy.evaluate(event);

    if (!policyResult.allowed) {
      const result: EnforcementResult = {
        decision: "BLOCK",
        reason: policyResult.reason,
        riskScore: 100,
        threats: [],
        permission: permission.action,
        policy: "block",
        security: "allow",
      };

      await this.audit(request, result, metadata);
      return result;
    }

    // --------------------------------------------------------
    // 4. Security enforcement
    // --------------------------------------------------------

    const securityResult = this.context.security.check(event);

    const securityDecision =
      securityResult.decision === "block"
        ? "block"
        : "allow";

    const threats: EnforcementThreat[] = [];

    if (securityDecision === "block") {
      threats.push({
        type: "security_violation",
        severity: "high",
        description: securityResult.reason,
        score: 90,
      });
    }

    // --------------------------------------------------------
    // 5. Risk analysis
    // --------------------------------------------------------

    const riskSignal = this.context.risk.analyze(event);

    let riskScore = 0;

    if (riskSignal?.level === "low") {
      riskScore = 10;
    } else if (riskSignal?.level === "medium") {
      riskScore = 50;
    } else if (riskSignal?.level === "high") {
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

    // --------------------------------------------------------
    // 6. Security block
    // --------------------------------------------------------

    if (securityDecision === "block") {
      const result: EnforcementResult = {
        decision: "BLOCK",
        reason: securityResult.reason,
        riskScore: Math.max(riskScore, 90),
        threats,
        permission: permission.action,
        policy: "allow",
        security: "block",
      };

      await this.audit(request, result, metadata);
      return result;
    }

    // --------------------------------------------------------
    // 7. Permission review boundary
    // --------------------------------------------------------

    if (permission.action === "review") {
      const result: EnforcementResult = {
        decision: "ESCALATE",
        reason: "Execution requires permission review.",
        riskScore: Math.max(riskScore, 50),
        threats,
        permission: "review",
        policy: "allow",
        security: "allow",
      };

      await this.audit(request, result, metadata);
      return result;
    }

    // --------------------------------------------------------
    // 8. Final allow
    // --------------------------------------------------------

    const result: EnforcementResult = {
      decision: "ALLOW",
      reason:
        "Permission, policy, security and risk checks passed.",
      riskScore,
      threats,
      permission: permission.action,
      policy: "allow",
      security: "allow",
    };

    await this.audit(request, result, metadata);

    return result;
  }

  /**
   * Backward-compatible enforcement API.
   *
   * Older runtime traces and integrations used `evaluate()`.
   * Keep this alias so upgrading the enforcement layer does not
   * break existing callers.
   */
  async evaluate(
    request: EnforcementRequest,
  ): Promise<EnforcementResult> {
    return this.enforce(request);
  }

  private async audit(
    request: EnforcementRequest,
    result: EnforcementResult,
    metadata: Record<string, unknown>,
  ): Promise<void> {
    const auditRecord: EnforcementAuditRecord = {
      agentId: request.agentId,
      resourceType: request.resourceType,
      tool: request.tool,
      action: request.action,
      decision: result.decision,
      reason: result.reason,
      riskScore: result.riskScore,
      threats: result.threats,
      metadata,
    };

    this.context.decisionStore.record({
      id: crypto.randomUUID(),
      agentId: auditRecord.agentId,
      action: auditRecord.action,
      decision:
        auditRecord.decision.toLowerCase() as
          | "allow"
          | "block"
          | "escalate",
      reason: auditRecord.reason,
      timestamp: new Date(),
      riskScore: auditRecord.riskScore,
      metadata: {
        resourceType: auditRecord.resourceType,
        tool: auditRecord.tool,
        threats: auditRecord.threats,
        ...(auditRecord.metadata ?? {}),
      },
    });
  }
}
