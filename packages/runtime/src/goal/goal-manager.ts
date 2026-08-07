import {
AgentGoal,
GoalStatus
} from "./goal";

import {
TaskDecomposer
} from "./decomposition";

export class GoalManager {

private goals:
Map<string,AgentGoal>;

constructor(

private decomposer=
new TaskDecomposer()

){

this.goals=
new Map();

}

create(
agentId:string,
objective:string,
priority:number=1
){

const goal:AgentGoal={

id:
crypto.randomUUID(),

agentId,

objective,

status:
"created",

priority,

createdAt:
new Date()

};

this.goals.set(
goal.id,
goal
);

return goal;

}

tasks(
goalId:string
){

const goal=
this.get(goalId);

return this.decomposer.decompose(
goal.id,
goal.objective
);

}

get(
id:string
){

const goal=
this.goals.get(id);

if(!goal){

throw new Error(
`Goal not found: ${id}`
);

}

return goal;

}

updateStatus(
id:string,
status:GoalStatus
){

const goal=
this.get(id);

goal.status=status;

return goal;

}

list(){

return Array.from(
this.goals.values()
);

}

}
