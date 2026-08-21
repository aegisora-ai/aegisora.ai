import {
Agent
} from "../agent";

import {
PlannerEngine
} from "../planner";

import {
AgentExecutor,
ExecutionResult
} from "../execution";

import {
Observer
} from "../observation";

import {
ReflectionEngine
} from "../reflection";

import {
LearningEngine
} from "../learning";

import {
AgentLoopState
} from "./loop-state";

export class AgentLoop {

private state:AgentLoopState;

constructor(

private planner:PlannerEngine,

private executor:AgentExecutor,

private observer:Observer,

private reflection:ReflectionEngine,

private learning:LearningEngine

){

this.state={

status:"idle",

iteration:0,

maxIterations:10

};

}

async run(

agent:Agent,

goal:string,

 goalId:string

){

this.state.status="running";
this.state.iteration=0;
this.state.startedAt=new Date();
this.state.completedAt=undefined;
this.state.lastAction=undefined;

let lastExecutionResult: ExecutionResult | undefined;

try {

while(
this.state.iteration <
this.state.maxIterations
){

this.state.iteration++;

const plan =
this.planner.createFromGoal(
goalId
);

lastExecutionResult = await this.executor.execute(
agent,
plan
);

const observation =
this.observer.observe({

agentId: agent.id,

goal

});

const reflection =
this.reflection.reflect(
agent.id,
lastExecutionResult
);

this.learning.learn({

id: crypto.randomUUID(),

agentId: agent.id,

input: observation,

output: lastExecutionResult,

success: lastExecutionResult.success,

score: lastExecutionResult.success ? 1 : 0,

lesson:
reflection.improvements.join("; "),

createdAt: new Date()

});

this.state.lastAction =
"learning-completed";

break;

}

this.state.status =
"completed";

this.state.completedAt =
new Date();

if (!lastExecutionResult) {
throw new Error("AgentLoop completed without an ExecutionResult");
}

return lastExecutionResult;

} catch (error) {

this.state.status =
"failed";

this.state.completedAt =
new Date();

this.state.lastAction =
"execution-failed";

throw error;

}

}

getState(){

return this.state;

}

}
