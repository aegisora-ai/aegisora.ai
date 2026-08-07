/**
 * Aegisora Execution Pipeline
 *
 * Central orchestration layer for
 * autonomous agent request evaluation.
 */

import type { AgentRequest } from "@aegisora/core";
import { PolicyEngine } from "@aegisora/policy-engine";

import { ContextAnalyzer } from "../context/context-analyzer";
import { RequestValidator } from "../services/request-validator";

export interface RuntimePipelineResult {
  status: "ALLOW" | "DENY" | "REVIEW";
  reason: string;
  riskScore: number;
  signals: string[];
}

export class ExecutionPipeline {
  private readonly contextAnalyzer: ContextAnalyzer;
  private readonly validator: RequestValidator;
  private readonly policyEngine: PolicyEngine;

  constructor() {
    this.contextAnalyzer = new ContextAnalyzer();
    this.validator = new RequestValidator();
    this.policyEngine = new PolicyEngine();
  }

  async execute(request: AgentRequest): Promise<RuntimePipelineResult> {
    /**
     * Step 1
     * Validate incoming request
     */
    this.validator.validate(request);

    /**
     * Step 2
     * Analyze runtime context
     */
    const context = this.contextAnalyzer.analyze(request);

    /**
     * Step 3
     * Create policy context
     */
    const policyContext = {
      requestId: context.requestId,
      agentId: context.agentId,
      action: context.action,
      riskLevel: context.riskLevel,
      suspicious: context.suspicious,
      signals: context.signals,
    };

    /**
     * Step 4
     * Run policy evaluation
     */
    const policyResult = await this.policyEngine.evaluate(policyContext);

    /**
     * Step 5
     * Runtime critical protection
     */
    if (context.riskLevel === "CRITICAL") {
      return {
        status: "DENY",
        reason: "Critical risk detected during runtime context analysis",
        riskScore: 100,
        signals: context.signals,
      };
    }

    /**
     * Step 6
     * Policy escalation
     */
    if (policyResult.decision === "ESCALATE") {
      return {
        status: "REVIEW",
        reason: policyResult.reason ?? "Policy engine requires human review",
        riskScore: policyResult.riskScore ?? 75,
        signals: context.signals,
      };
    }

    /**
     * Step 7
     * High risk runtime review
     */
    if (context.riskLevel === "HIGH") {
      return {
        status: "REVIEW",
        reason: "High risk request requires additional review",
        riskScore: 75,
        signals: context.signals,
      };
    }

    /**
     * Step 8
     * Medium risk monitoring
     */
    if (context.riskLevel === "MEDIUM") {
      return {
        status: "ALLOW",
        reason: "Request allowed with elevated monitoring",
        riskScore: 40,
        signals: context.signals,
      };
    }

    /**
     * Step 9
     * Final allow
     */
    return {
      status: "ALLOW",
      reason: policyResult.reason ?? "Request passed runtime governance checks",
      riskScore: 0,
      signals: context.signals,
    };
  }
}
