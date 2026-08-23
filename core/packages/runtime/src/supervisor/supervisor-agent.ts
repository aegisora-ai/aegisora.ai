import {
SupervisionTask
} from "./supervision-task";


export class SupervisorAgent {


private tasks:
Map<string,SupervisionTask>;



constructor(){

this.tasks =
new Map();

}



createTask(

goal:string,

agents:string[]

){


const task:SupervisionTask={


id:
crypto.randomUUID(),


goal,


agents,


status:
"idle",


createdAt:
new Date()


};


this.tasks.set(
task.id,
task
);


return task;

}




start(

id:string

){


const task =
this.tasks.get(id);


if(!task){

throw new Error(
"Supervision task not found"
);

}


task.status =
"running";


return task;

}





complete(

id:string,

result:unknown

){


const task =
this.tasks.get(id);


if(!task){

throw new Error(
"Supervision task not found"
);

}


task.status =
"completed";


task.result =
result;


return task;

}




list(){

return Array.from(
this.tasks.values()
);

}


}
