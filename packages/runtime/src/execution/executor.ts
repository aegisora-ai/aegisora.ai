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
ToolSelector
} from "../tools";


import {
PlannerEngine
} from "../planner";









import { RuntimeContext } from "../context/runtime-context";






export interface ExecutionResult {

agentId:string;

success:boolean;

steps:number;

output:unknown;

}


export class AgentExecutor {


constructor(
private tasks:TaskManager,
private selector:ToolSelector,

private planner:PlannerEngine,

private context:RuntimeContext


){}


async execute(
agent:Agent,
plan:AgentPlan
):Promise<ExecutionResult>{


agent.start();

let completed = 0;


for(const step of plan.steps){

await this.executeStep(
agent,
step,
plan.id
);

completed++;

}


agent.complete();


return {

agentId:agent.id,

success:true,

steps:completed,

output:{
planId:plan.id,
goal:plan.goalId
}

};

}


private async executeStep(
agent:Agent,
step:PlanStep,
planId:string
){


const selection =
this.selector.select(
step.description
);


console.log(
"TOOL SELECTED:",
selection.tool.name,
"CONFIDENCE:",
selection.confidence
);

const policyDecision =
this.context.policy.evaluate({

id:crypto.randomUUID(),

type:"tool.called",

agentId:agent.id,

timestamp:new Date(),

payload:{
tool:selection.tool.name
}

});



this.context.decisionStore.record({

id:crypto.randomUUID(),

agentId:agent.id,

action:
"tool.execute",

decision:
policyDecision.allowed
?
"allow"
:
"block",

reason:
policyDecision.reason,

timestamp:
new Date()

});


if(
!policyDecision.allowed
){

throw new Error(
policyDecision.reason
);

}


const securityResult =
this.context.security.check({

id:crypto.randomUUID(),

type:"tool.called",

agentId:agent.id,

timestamp:new Date(),

payload:{
tool:selection.tool.name
}

});


if(
securityResult.decision==="block"
){

throw new Error(
securityResult.reason
);

}



const result =
await selection.tool.execute(
{
task:step.description
},
{
agentId:agent.id
}
);

console.log(
"TOOL RESULT:",
JSON.stringify(result)
);


agent.remember(
`step_${step.order}`,
{
id:step.id,
description:step.description,
tool:selection.tool.name,
confidence:selection.confidence,
result,
completed:true
}
);

this.planner.completeStep(
planId,
step.id
);


}


}
