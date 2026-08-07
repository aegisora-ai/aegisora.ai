export interface Observation {

id:string;

source:string;

data:unknown;

timestamp:Date;

}


export interface ObservationContext {

agentId:string;

goal:string;

}
