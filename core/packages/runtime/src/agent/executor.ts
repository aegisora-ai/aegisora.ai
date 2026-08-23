import type { AgentPlan } from "./planner";

import { ToolRegistry } from "./tool";

export interface ExecutionResult {
  success: boolean;

  output: unknown;
}

export class AgentExecutor {
  constructor(private tools: ToolRegistry) {}

  async execute(plan: AgentPlan): Promise<ExecutionResult> {
    const results = [];

    for (const step of plan.steps) {
      results.push({
        step: step.action,

        status: "completed",
      });
    }

    return {
      success: true,

      output: results,
    };
  }
}
