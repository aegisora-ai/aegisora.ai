"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentExecutor = void 0;
class AgentExecutor {
    tasks;
    selector;
    planner;
    constructor(tasks, selector, planner) {
        this.tasks = tasks;
        this.selector = selector;
        this.planner = planner;
    }
    async execute(agent, plan) {
        agent.start();
        let completed = 0;
        for (const step of plan.steps) {
            await this.executeStep(agent, step, plan.id);
            completed++;
        }
        agent.complete();
        return {
            agentId: agent.id,
            success: true,
            steps: completed,
            output: {
                planId: plan.id,
                goal: plan.goalId
            }
        };
    }
    async executeStep(agent, step, planId) {
        const selection = this.selector.select(step.description);
        console.log("TOOL SELECTED:", selection.tool.name, "CONFIDENCE:", selection.confidence);
        const result = await selection.tool.execute({
            task: step.description
        }, {
            agentId: agent.id
        });
        console.log("TOOL RESULT:", JSON.stringify(result));
        agent.remember(`step_${step.order}`, {
            id: step.id,
            description: step.description,
            tool: selection.tool.name,
            confidence: selection.confidence,
            result,
            completed: true
        });
        this.planner.completeStep(planId, step.id);
    }
}
exports.AgentExecutor = AgentExecutor;
