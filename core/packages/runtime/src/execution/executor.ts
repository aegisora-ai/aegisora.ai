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
  ToolSelector,
  ToolRegistry
} from "../tools";

import {
  PlannerEngine
} from "../planner";

import { RuntimeContext } from "../context/runtime-context";
import {
  ProviderExecutionGateway,
  type ProviderName,
} from "../providers";

export interface ExecutionResult {
  agentId: string;
  success: boolean;
  steps: number;
  output: unknown;
  traceId?: string;
  decisionId?: string;
  executionId?: string;
  evidenceId?: string;
}

interface AgentStepResult {
  provider: ProviderName;
  model: string;
  reasoning: string;
  tool: string;
  result: unknown;
  enforcement: {
    decision: string;
    riskScore: number;
  };
  traceId?: string;
  decisionId?: string;
  executionId?: string;
  evidenceId?: string;
}

export class AgentExecutor {
constructor(
    private tasks: TaskManager,
    private selector: ToolSelector,
    private planner: PlannerEngine,
    private context: RuntimeContext,
    private tools: ToolRegistry,
    private executionToken: symbol,
    private providerGateway: ProviderExecutionGateway
  ) {
}

  async execute(
    agent: Agent,
    plan: AgentPlan
  ): Promise<ExecutionResult> {

    let completed = 0;
    let lastOutput: unknown = undefined;

    let lastTraceId: string | undefined;
    let lastDecisionId: string | undefined;
    let lastExecutionId: string | undefined;
    let lastEvidenceId: string | undefined;

    for (const step of plan.steps) {

      const stepResult = await this.executeStep(
        agent,
        step,
        plan.id,
      );

      lastOutput = stepResult;

      lastTraceId = stepResult.traceId;
      lastDecisionId = stepResult.decisionId;
      lastExecutionId = stepResult.executionId;
      lastEvidenceId = stepResult.evidenceId;

      completed++;
    }

    return {
      agentId: agent.id,
      success: true,
      steps: completed,
      output: {
        planId: plan.id,
        goal: plan.goalId,
        lastOutput,
      },
      traceId: lastTraceId,
      decisionId: lastDecisionId,
      executionId: lastExecutionId,
      evidenceId: lastEvidenceId,
    };
  }
private async executeStep(
    agent: Agent,
    step: PlanStep,
    planId: string,
  ): Promise<AgentStepResult> {

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
     * CANONICAL TOOL AUTHORIZATION
     * ----------------------------------------------------------
     *
     * ToolRegistry owns the canonical governance decision for
     * tool execution.
     *
     * Authorization is evaluated exactly once and converted into
     * a single-use receipt. The receipt is then carried into the
     * execution boundary so the same action is not evaluated twice.
     */

    const authorization =
      await this.tools.authorize(
        agent.id,
        selection.tool.name,
        step.description,
        {
          planId,
          stepId: step.id,
          confidence: selection.confidence,
        },
      );

    const enforcement =
      authorization.enforcement;

    console.log(
      "ENFORCEMENT:",
      enforcement.decision,
      "RISK:",
      enforcement.riskScore,
    );

    /*
     * ----------------------------------------------------------
     * Provider execution
     * ----------------------------------------------------------
     */

    const providerName: ProviderName = "openai";


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
    const model = providerResponse.model;

    /*
     * ----------------------------------------------------------
     * Actual tool execution
     * ----------------------------------------------------------
     *
     * This is intentionally AFTER enforcement.
     */
const result =
      await this.tools.execute(
        selection.tool.name,
        {
          task: step.description,
          reasoning: providerResponse.output,
        },
        {
          agentId: agent.id,
        },
        this.executionToken,
        authorization,
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
