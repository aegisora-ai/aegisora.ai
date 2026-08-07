"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentLoop = void 0;
class AgentLoop {
    planner;
    executor;
    observer;
    reflection;
    learning;
    state;
    constructor(planner, executor, observer, reflection, learning) {
        this.planner = planner;
        this.executor = executor;
        this.observer = observer;
        this.reflection = reflection;
        this.learning = learning;
        this.state = {
            status: "idle",
            iteration: 0,
            maxIterations: 10
        };
    }
    async run(agent, goal, goalId) {
        this.state.status = "running";
        this.state.startedAt = new Date();
        while (this.state.iteration <
            this.state.maxIterations) {
            this.state.iteration++;
            const plan = this.planner.createFromGoal(goalId);
            const result = await this.executor.execute(agent, plan);
            const observation = this.observer.observe({
                agentId: agent.id,
                goal
            });
            const reflection = this.reflection.reflect(agent.id, result);
            this.learning.learn({
                id: crypto.randomUUID(),
                agentId: agent.id,
                input: observation,
                output: result,
                success: result.success,
                score: 1,
                lesson: reflection.improvements.join("; "),
                createdAt: new Date()
            });
            this.state.lastAction =
                "learning-completed";
            break;
        }
        this.state.status = "completed";
        this.state.completedAt = new Date();
        return this.state;
    }
    getState() {
        return this.state;
    }
}
exports.AgentLoop = AgentLoop;
