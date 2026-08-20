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
"failed" |
"stopped";

}


export class Agent {


  readonly id!:string;

readonly name:string;


private state:AgentState;


private memory:AgentMemory;



  constructor(
    config:AgentConfig
  ){

    Object.defineProperty(this, "id", {
      value: config.id,
      writable: false,
      enumerable: true,
      configurable: false,
    });

    this.name =
      config.name;

    this.state = {
      status:"idle"
    };

    this.memory =
      new AgentMemory();
  }

private transition(
nextStatus: AgentState["status"]
){

const current =
this.state.status;

const allowed: Record<
AgentState["status"],
AgentState["status"][]
> = {

idle: [
"running"
],

running: [
"completed",
"failed",
"stopped"
],

completed: [],

failed: [],

stopped: []

};

if (
!allowed[current].includes(nextStatus)
){

throw new Error(
`Illegal agent lifecycle transition: ${current} -> ${nextStatus}`
);

}

this.state.status =
nextStatus;

}


/**
 * Start execution
 */

start(){

this.transition(
"running"
);

}



/**
 * Complete execution
 */

complete(){

this.transition(
"completed"
);

}



/**
 * Fail execution
 */

fail(){

this.transition(
"failed"
);

}

/**
 * Stop execution
 */
stop(){

this.transition(
"stopped"
);

}



/**
 * Current state
 */

getState(){

return {
status:
this.state.status
};

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
