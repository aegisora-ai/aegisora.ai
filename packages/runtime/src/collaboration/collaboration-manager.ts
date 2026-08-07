import {
AgentTeam,
CollaborationTask
} from "./collaboration";


export class CollaborationManager {


private teams:
Map<string,AgentTeam>;


private tasks:
Map<string,CollaborationTask>;



constructor(){

this.teams =
new Map();

this.tasks =
new Map();

}



createTeam(

name:string,

members:string[]

){


const team:AgentTeam={

id:
crypto.randomUUID(),

name,

members,

createdAt:
new Date()

};


this.teams.set(
team.id,
team
);


return team;

}




assignTask(

teamId:string,

agentId:string,

goal:string

){


const task:CollaborationTask={


id:
crypto.randomUUID(),


teamId,


assignedAgent:
agentId,


goal,


status:
"idle"


};


this.tasks.set(
task.id,
task
);


return task;


}




completeTask(

taskId:string,

result:unknown

){


const task =
this.tasks.get(taskId);


if(!task){

throw new Error(
"Task not found"
);

}


task.status =
"completed";


task.result =
result;


return task;

}




getTeam(
id:string
){

return this.teams.get(id);

}




tasksList(){

return Array.from(
this.tasks.values()
);

}


}
