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
  EnforcementGate
} from "../enforcement";

import {
  ProviderExecutionGateway,
  type ProviderName,
} from "../providers";

export interface ExecutionResult {
  agentId: string;
  success: boolean;
  steps: number;
  output: unknown;
}

export class AgentExecutor {

  private enforcement: EnforcementGate;

  constructor(
    private tasks: TaskManager,
    private selector: ToolSelector,
    private planner: PlannerEngine,
    private context: RuntimeContext,
    private providerGateway: ProviderExecutionGateway =
    new ProviderExecutionGateway(context),
  ) {
    this.enforcement = new EnforcementGate(context);
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

    const selection = this.selector.select(
      step.description
    );

    console.log(
      "TOOL SELECTED:",
      selection.tool.name,
      "CONFIDENCE:",
      selection.confidence
    );

    /*
     * ----------------------------------------------------------
     * AEGISORA ENFORCEMENT BOUNDARY
     * ----------------------------------------------------------
     *
     * No tool execution may happen before the unified
     * permission -> policy -> security enforcement gate.
     *
     * IMPORTANT:
     * The actual step payload is passed into the gate.
     */

    const enforcement = await this.enforcement.enforce({
      agentId: agent.id,
      tool: selection.tool.name,
      action: "tool.execute",
      input: step.description,
      metadata: {
        planId,
        stepId: step.id,
        confidence: selection.confidence,
      },
    });

    console.log(
      "ENFORCEMENT:",
      enforcement.decision,
      "RISK:",
      enforcement.riskScore
    );

    if (enforcement.decision !== "ALLOW") {
      throw new Error(
        `[ENFORCEMENT:${enforcement.decision}] ${enforcement.reason}`
      );
    }

    /*
     * ----------------------------------------------------------
     * Provider execution
     * ----------------------------------------------------------
     */

    const providerName: ProviderName = "openai";

const model =
  this.providerGateway.getDefaultModel(
    providerName
  );

const providerResponse =
  await this.providerGateway.generate({

    agentId: agent.id,

    provider: providerName,

    request: {
      prompt: step.description,
    },

    metadata: {
      planId,
      stepId: step.id,
      tool: selection.tool.name,
      riskScore:
        enforcement.riskScore,
    },

  });

    /*
     * ----------------------------------------------------------
     * Actual tool execution
     * ----------------------------------------------------------
     *
     * This is intentionally AFTER enforcement.
     */

    /*

     * ----------------------------------------------------------

     * Persist tool.called BEFORE actual tool execution

     * ----------------------------------------------------------

     *

     * This records the execution attempt before the tool runs.

     * It must survive even when the tool throws.

     * Enforcement has already passed at this point.

     */

    this.context.eventBus.emit({

      id: crypto.randomUUID(),

      type: "tool.called",

      agentId: agent.id,

      timestamp: new Date(),

      payload: {

        tool: selection.tool.name,

        task: step.description,

        planId,

        stepId: step.id,

        confidence: selection.confidence,

        provider: providerName,

        model,

      },

    });


    const result =
      await selection.tool.execute(
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
        enforcement: {
          decision: enforcement.decision,
          riskScore: enforcement.riskScore,
          threats: enforcement.threats,
        },
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
      enforcement: {
        decision: enforcement.decision,
        riskScore: enforcement.riskScore,
      },
    };
  }
}
