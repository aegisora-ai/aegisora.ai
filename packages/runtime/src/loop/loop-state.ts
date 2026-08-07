export type LoopStatus =
"idle" |
"running" |
"paused" |
"completed" |
"failed";


export interface AgentLoopState {

status:LoopStatus;

iteration:number;

maxIterations:number;

lastAction?:string;

startedAt?:Date;

completedAt?:Date;

}
