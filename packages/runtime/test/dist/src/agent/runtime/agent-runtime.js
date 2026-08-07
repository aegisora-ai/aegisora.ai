"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRuntime = void 0;
const tools_1 = require("../../tools");
const __1 = require("..");
const goal_1 = require("../../goal");
const planner_1 = require("../../planner");
const tasks_1 = require("../../tasks");
const execution_1 = require("../../execution");
const observation_1 = require("../../observation");
const reflection_1 = require("../../reflection");
const learning_1 = require("../../learning");
const loop_1 = require("../../loop");
class AgentRuntime {
    agents = new Map();
    goals = new goal_1.GoalManager();
    planner = new planner_1.PlannerEngine(this.goals);
    tasks = new tasks_1.TaskManager();
    tools = new tools_1.ToolRegistry();
    selector = new tools_1.ToolSelector(this.tools);
    executor = new execution_1.AgentExecutor(this.tasks, this.selector, this.planner);
    observer = new observation_1.Observer();
    reflection = new reflection_1.ReflectionEngine();
    learning = new learning_1.LearningEngine();
    loop = new loop_1.AgentLoop(this.planner, this.executor, this.observer, this.reflection, this.learning);
    create(id, config) {
        const agent = new __1.Agent({
            id,
            name: id,
            metadata: config && typeof config === "object"
                ? config
                : undefined
        });
        this.agents.set(id, agent);
        return agent;
    }
    async execute(request) {
        const agent = this.agents.get(request.agentId);
        if (!agent) {
            throw new Error(`Agent not found: ${request.agentId}`);
        }
        const goal = this.goals.create(agent.id, request.goal);
        await this.loop.run(agent, goal.objective, goal.id);
        return {
            agentId: agent.id,
            status: "completed",
            finishedAt: new Date()
        };
    }
    registerTool(tool) {
        return this.tools.register(tool);
    }
    getToolRegistry() {
        return this.tools;
    }
    getState() {
        return {
            agents: Array.from(this.agents.keys()),
            goals: this.goals.list(),
            plannerPlans: this.planner.list(),
            tools: this.tools.list()
                .map(tool => tool.name),
            loop: this.loop.getState()
        };
    }
    createAgent(id, config) {
        return this.create(id, config);
    }
    runAgent(id, goal) {
        return this.execute({
            agentId: id,
            goal
        });
    }
}
exports.AgentRuntime = AgentRuntime;
