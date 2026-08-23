export interface PlanStep {
  id: string;

  action: string;

  description: string;
}

export interface AgentPlan {
  goal: string;

  steps: PlanStep[];
}

export class AgentPlanner {
  createPlan(goal: string): AgentPlan {
    return {
      goal,

      steps: [
        {
          id: "step-1",

          action: "analyze",

          description: "Analyze user request",
        },

        {
          id: "step-2",

          action: "execute",

          description: "Execute required operation",
        },

        {
          id: "step-3",

          action: "verify",

          description: "Verify execution result",
        },
      ],
    };
  }
}
