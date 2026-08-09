import {
ToolRegistry,
ToolSelector,
EchoTool
} from "../../tools";

import {
Agent
} from "..";

import {
GoalManager
} from "../../goal";

import {
PlannerEngine
} from "../../planner";

import {
TaskManager
} from "../../tasks";

import {
AgentExecutor
} from "../../execution";

import {
Observer
} from "../../observation";

import {
ReflectionEngine
} from "../../reflection";

import {
LearningEngine
} from "../../learning";

import {
AgentLoop
} from "../../loop";

import {
EventBus
} from "../../events";

import {
EventStore
} from "../../observability";

import {
RuntimeMonitor
} from "../../monitoring";

import {
RiskEngine
} from "../../security";

import {
DecisionTraceStore
} from "../../audit";

import { RuntimeContext } from "../../context/runtime-context";

export interface AgentExecutionRequest {
agentId: string;
goal: string;
}

export interface AgentExecutionResponse {
agentId: string;
status: string;
finishedAt: Date;
}

export class AgentRuntime {

private agents =
new Map<string, Agent>();

private context =
new RuntimeContext();

private events =
this.context.eventBus;

private goals =
new GoalManager();

private planner =
new PlannerEngine(
this.goals
);

private tasks =
new TaskManager();

private tools =
new ToolRegistry();

private selector =
new ToolSelector(
this.tools
);

private executor =
new AgentExecutor(
this.tasks,
this.selector,
this.planner,
this.context
);

private observer =
new Observer();

private reflection =
new ReflectionEngine();

private learning =
new LearningEngine();

private loop =
new AgentLoop(
this.planner,
this.executor,
this.observer,
this.reflection,
this.learning
);

constructor() {

this.tools.register(
new EchoTool()
);

}

create(
id: string,
config?: unknown
) {

const agent =
new Agent({
id,
name: id,
metadata:
config &&
typeof config === "object"
? config as Record<string, unknown>
: undefined
});

this.agents.set(
id,
agent
);

this.context.lifecycle.create(
id,
id
);

return agent;

}

async execute(
request: AgentExecutionRequest
): Promise<AgentExecutionResponse> {

const agent =
this.agents.get(
request.agentId
);

if (!agent) {

throw new Error(`Agent not found: ${request.agentId}`);

}

this.context.lifecycle.start(
agent.id
);

const goal =
this.goals.create(
agent.id,
request.goal
);

try {

await this.loop.run(
agent,
goal.objective,
goal.id
);

this.context.lifecycle.complete(
agent.id
);

return {

agentId: agent.id,

status: "completed",

finishedAt: new Date()

};

} catch (error) {

const reason =
error instanceof Error
? error.message
: String(error);

this.context.lifecycle.fail(
agent.id,
reason
);

agent.fail();

throw error;

}

}

registerTool(
tool: import("../../tools").RuntimeTool
) {

return this.tools.register(
tool
);

}

getToolRegistry() {

return this.tools;

}

getState() {

return {

agents:
Array.from(
this.agents.keys()
),

goals:
this.goals.list(),

plannerPlans:
this.planner.list(),

tools:
this.tools.list()
.map(
tool => tool.name
),

loop:
this.loop.getState()

};

}

getSnapshot(
id: string
) {

return this.context.snapshot
.getSnapshot(
id
);

}

getHealth(
id: string
) {

const snapshot =
this.context.snapshot
.getSnapshot(
id
);

if (!snapshot) {

return null;

}

return this.context.health
.evaluate(
snapshot
);

}

getHealthSummary() {

return this.context.snapshot
.getAll()
.map(
snapshot =>
this.context.health
.evaluate(
snapshot
)
);

}

getSnapshots() {

return this.context.snapshot
.getAll();

}

getAgents() {

return this.context.agentRegistry.getAll();

}

getAgent(
id: string
) {

return this.context.agentRegistry.getById(
id
);

}

getEventStore() {

return this.context.eventStore;

}

getRiskSignals() {

const engine =
new RiskEngine();

return this.context.eventStore
.getAll()
.map(
event =>
engine.analyze(event)
)
.filter(
signal =>
signal !== null
);

}

getDecisionTraces() {

return this.context.decisionStore.getAll();

}

getMetrics() {

const monitor =
new RuntimeMonitor(
this.context.eventStore.getAll()
);

return monitor.getMetrics();

}

getEventBus() {

return this.events;

}

createAgent(
id: string,
config?: unknown
) {

return this.create(
id,
config
);

}

runAgent(
id: string,
goal: string = ""
) {

return this.execute({

agentId: id,

goal

});

}

startAgent(
id: string,
goal: string = ""
) {

return this.runAgent(
id,
goal
);

}

completeAgent(
id: string
) {
const agent =
this.agents.get(id);

if (!agent) {
throw new Error(
`Agent not found: ${id}`
);
}

const currentState =
agent.getState().status;

if (
currentState === "completed" ||
currentState === "failed" ||
currentState === "stopped"
) {
throw new Error(
`Cannot complete agent from terminal state: ${currentState}`
);
}

this.context.lifecycle.complete(
id
);

agent.complete();

return {
agentId: id,
status: "COMPLETED",
finishedAt: new Date()
};
}

failAgent(
id: string,
error?: unknown
) {
const agent =
this.agents.get(id);

if (!agent) {
throw new Error(
`Agent not found: ${id}`
);
}

const currentState =
agent.getState().status;

if (
currentState === "completed" ||
currentState === "failed" ||
currentState === "stopped"
) {
throw new Error(
`Cannot fail agent from terminal state: ${currentState}`
);
}

const reason =
error instanceof Error
? error.message
: String(error ?? "Agent execution failed");

this.context.lifecycle.fail(
id,
reason
);

agent.fail();

return {
agentId: id,
status: "FAILED",
error
};
}

stopAgent(
id: string
) {
const agent =
this.agents.get(id);

if (!agent) {
throw new Error(
`Agent not found: ${id}`
);
}

const currentState =
agent.getState().status;

if (
currentState === "completed" ||
currentState === "failed" ||
currentState === "stopped"
) {
throw new Error(
`Cannot stop agent from terminal state: ${currentState}`
);
}

this.context.lifecycle.stop(
id
);

agent.stop();

return {
agentId: id,
status: "STOPPED"
};
}

}
