import {
AutonomyState
} from "./autonomy-state";


export class AutonomyEngine {


private states:
Map<string,AutonomyState>;


constructor(){

this.states =
new Map();

}



start(
agentId:string,
goalId:string
){

const state:AutonomyState={

id:
crypto.randomUUID(),

agentId,

goalId,

status:
"initialized",

currentStep:
"bootstrap",

progress:
0,

createdAt:
new Date(),

updatedAt:
new Date()

};


this.states.set(
state.id,
state
);


return state;

}



update(
id:string,
status:AutonomyState["status"],
step:string,
progress:number
){


const state =
this.states.get(id);



if(!state){

throw new Error(
"Autonomy state not found"
);

}


state.status =
status;


state.currentStep =
step;


state.progress =
progress;


state.updatedAt =
new Date();


return state;


}



get(
id:string
){

const state =
this.states.get(id);


if(!state){

throw new Error(
"Autonomy state not found"
);

}


return state;

}



list(){

return Array.from(
this.states.values()
);

}


}
