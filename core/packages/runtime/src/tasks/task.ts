export type TaskStatus =
"idle" |
"running" |
"completed" |
"failed";


export interface AgentTask {


id:string;


agentId:string;


goal:string;


status:TaskStatus;


result?:unknown;


createdAt:Date;


completedAt?:Date;


}
