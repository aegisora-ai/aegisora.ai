import {
AgentTask
} from "./task";


export class TaskManager {


private tasks:
Map<string,AgentTask>;



constructor(){

this.tasks =
new Map();

}



/**
 * Create task
 */

create(
agentId:string,
goal:string
){


const task:AgentTask = {


id:
crypto.randomUUID(),


agentId,


goal,


status:"idle",


createdAt:
new Date()


};



this.tasks.set(
task.id,
task
);


return task;

}



/**
 * Start task
 */

start(
id:string
){


const task =
this.get(id);


task.status =
"running";


return task;

}



/**
 * Complete task
 */

complete(
id:string,
result:unknown
){


const task =
this.get(id);


task.status =
"completed";


task.result =
result;


task.completedAt =
new Date();


return task;

}



/**
 * Get task
 */

get(
id:string
){


const task =
this.tasks.get(id);



if(!task){

throw new Error(
`Task not found: ${id}`
);

}


return task;

}



/**
 * List tasks
 */

list(){

return Array.from(
this.tasks.values()
);

}


}
