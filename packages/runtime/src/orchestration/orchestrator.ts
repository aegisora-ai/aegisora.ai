import {
Agent
} from "../agent";

import {
DecisionEngine
} from "../decision";

import {
PlannerEngine
} from "../planner";

import {
AgentExecutor
} from "../execution";

import {
Evaluator
} from "../evaluation";

import {
ReflectionEngine
} from "../reflection";


export class AgentOrchestrator {


constructor(

private decision:
DecisionEngine,

private planner:
PlannerEngine,

private executor:
AgentExecutor,

private evaluator:
Evaluator,

private reflection:
ReflectionEngine

){}



async run(

agent:Agent,

goal:string

){


const decision =
this.decision.decide(goal);



if(decision.type==="stop"){

throw new Error(
decision.reason
);

}



const runtimeGoal =
crypto.randomUUID();

const plan =
this.planner.createFromGoal(
runtimeGoal
);



const execution =
await this.executor.execute(
agent,
plan
);



const evaluation =
this.evaluator.evaluate(
execution
);



const reflection =
this.reflection.reflect(
agent.id,
evaluation
);



return {

decision,

plan,

execution,

evaluation,

reflection

};


}


}
