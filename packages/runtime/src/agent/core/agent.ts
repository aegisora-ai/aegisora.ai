import {
AgentMemory
} from "../../memory";


export interface AgentConfig {

id:string;

name:string;

description?:string;

metadata?:Record<string,unknown>;

}


export interface AgentState {

status:
"idle" |
"running" |
"completed" |
"failed";

}


export class Agent {


readonly id:string;

readonly name:string;


private state:AgentState;


private memory:AgentMemory;



constructor(
config:AgentConfig
){

this.id =
config.id;


this.name =
config.name;


this.state = {

status:"idle"

};


this.memory =
new AgentMemory();

}



/**
 * Start execution
 */

start(){

this.state.status =
"running";

}



/**
 * Complete execution
 */

complete(){

this.state.status =
"completed";

}



/**
 * Fail execution
 */

fail(){

this.state.status =
"failed";

}



/**
 * Current state
 */

getState(){

return this.state;

}



/**
 * Store memory
 */

remember(
key:string,
value:unknown
){

this.memory.set(
key,
value
);

}



/**
 * Retrieve memory
 */

recall(
key:string
){

return this.memory.get(key);

}



/**
 * List memories
 */

memories(){

return this.memory.list();

}


}
