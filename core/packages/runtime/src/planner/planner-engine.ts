import {
AgentPlan,
PlanStep
} from "./plan";

import {
GoalManager
} from "../goal";

export class PlannerEngine {

private plans=
new Map<string,AgentPlan>();

constructor(

private goals:GoalManager

){}

createFromGoal(
goalId:string
){

const goal=
this.goals.get(goalId);

const tasks=
this.goals.tasks(goalId);

const steps:PlanStep[]=
tasks.map(
(task,index)=>({

id:task.id,

goalId,

description:task.description,

order:index+1,

completed:false

})
);

const plan:AgentPlan={

id:
crypto.randomUUID(),

goalId,

steps,

createdAt:
new Date()

};

this.plans.set(
plan.id,
plan
);

return plan;

}

nextStep(
planId:string
){

return this.get(planId)
.steps.find(
s=>!s.completed
);

}

completeStep(
planId:string,
stepId:string
){

const step=
this.get(planId)
.steps.find(
s=>s.id===stepId
);

if(step){

step.completed=true;

}

}

get(
id:string
){

const plan=
this.plans.get(id);

if(!plan){

throw new Error(
"Plan not found"
);

}

return plan;

}

list(){

return Array.from(
this.plans.values()
);

}

}
