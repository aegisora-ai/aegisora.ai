"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentOrchestrator = void 0;
class AgentOrchestrator {
    decision;
    planner;
    executor;
    evaluator;
    reflection;
    constructor(decision, planner, executor, evaluator, reflection) {
        this.decision = decision;
        this.planner = planner;
        this.executor = executor;
        this.evaluator = evaluator;
        this.reflection = reflection;
    }
    async run(agent, goal) {
        const decision = this.decision.decide(goal);
        if (decision.type === "stop") {
            throw new Error(decision.reason);
        }
        const runtimeGoal = crypto.randomUUID();
        const plan = this.planner.createFromGoal(runtimeGoal);
        const execution = await this.executor.execute(agent, plan);
        const evaluation = this.evaluator.evaluate(execution);
        const reflection = this.reflection.reflect(agent.id, evaluation);
        return {
            decision,
            plan,
            execution,
            evaluation,
            reflection
        };
    }
}
exports.AgentOrchestrator = AgentOrchestrator;
