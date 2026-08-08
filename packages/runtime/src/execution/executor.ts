import {
  Agent
} from "../agent";

import {
  AgentPlan,
  PlanStep
} from "../planner";

import {
  TaskManager
} from "../tasks";

import {
  ToolSelector
} from "../tools";

import {
  PlannerEngine
} from "../planner";

import { RuntimeContext } from "../context/runtime-context";

import {
  ProviderRouter,
  ProviderName,
  ProviderManager,
} from "../providers";

import type {
  ProviderRuntimeContext,
} from "../types/context";

export interface ExecutionResult {
  agentId: string;
  success: boolean;
  steps: number;
  output: unknown;
}

export class AgentExecutor {
  private readonly providerManager: ProviderManager;

  constructor(
    private tasks: TaskManager,
    private selector: ToolSelector,
    private planner: PlannerEngine,
    private context: RuntimeContext,
    private providerRouter: ProviderRouter = new ProviderRouter(),
    private providerManager: ProviderManager = new ProviderManager(providerRouter),
  ) {
    this.providerManager = providerManager;
  }

  async execute(
    agent: Agent,
    plan: AgentPlan
  ): Promise<ExecutionResult> {
    agent.start();

    let completed = 0;
    let lastOutput: unknown = undefined;

    for (const step of plan.steps) {
      lastOutput = await this.executeStep(
        agent,
        step,
        plan.id,
      );

      completed++;
    }

    agent.complete();

    return {
      agentId: agent.id,
      success: true,
      steps: completed,
      output: {
        planId: plan.id,
        goal: plan.goalId,
        lastOutput,
      }
    };
  }

  private async executeStep(
    agent: Agent,
    step: PlanStep,
    planId: string,
  ): Promise<unknown> {
    const selection = this.selector.select(step.description);

    console.log(
      "TOOL SELECTED:",
      selection.tool.name,
      "CONFIDENCE:",
      selection.confidence
    );

    const policyDecision = this.context.policy.evaluate({
      id: crypto.randomUUID(),
      type: "tool.called",
      agentId: agent.id,
      timestamp: new Date(),
      payload: {
        tool: selection.tool.name
      }
    });

    this.context.decisionStore.record({
      id: crypto.randomUUID(),
      agentId: agent.id,
      action: "tool.execute",
      decision: policyDecision.allowed ? "allow" : "block",
      reason: policyDecision.reason,
      timestamp: new Date()
    });

    if (!policyDecision.allowed) {
      throw new Error(policyDecision.reason);
    }

    const securityResult = this.context.security.check({
      id: crypto.randomUUID(),
      type: "tool.called",
      agentId: agent.id,
      timestamp: new Date(),
      payload: {
        tool: selection.tool.name
      }
    });

    if (securityResult.decision === "block") {
      throw new Error(securityResult.reason);
    }

    const providerName: ProviderName = "openai";
    const model = this.providerManager.getDefaultModel(providerName);
    const requestId = crypto.randomUUID();

    const providerContext: ProviderRuntimeContext = {
      requestId,
      prompt: step.description,
      agentId: agent.id,
      action: "agent.step",
      metadata: {
        planId,
        stepId: step.id,
        tool: selection.tool.name,
      },
      riskScore: 0,
      riskLevel: "LOW",
      suspicious: false,
      signals: [],
      blocked: false,
      provider: providerName,
      startedAt: new Date(),
    };

    const provider = this.providerRouter.resolve(providerName);
    const providerResponse = await provider.generate(
      {
        model,
        prompt: step.description,
      },
      providerContext,
    );

    providerContext.response = providerResponse.output;
    providerContext.finishedAt = new Date();

    const result = await selection.tool.execute(
      {
        task: step.description,
        reasoning: providerResponse.output,
      },
      {
        agentId: agent.id
      }
    );

    console.log(
      "TOOL RESULT:",
      JSON.stringify(result)
    );

    agent.remember(
      `step_${step.order}`,
      {
        id: step.id,
        description: step.description,
        tool: selection.tool.name,
        confidence: selection.confidence,
        provider: providerName,
        model,
        reasoning: providerResponse.output,
        result,
        completed: true
      }
    );

    this.planner.completeStep(
      planId,
      step.id
    );

    return {
      provider: providerName,
      model,
      reasoning: providerResponse.output,
      tool: selection.tool.name,
      result,
    };
  }
}
