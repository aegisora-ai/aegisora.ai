export type GoalStatus =
"created" |
"planning" |
"executing" |
"completed" |
"failed";


export interface AgentGoal {


id:string;

agentId:string;

objective:string;

status:GoalStatus;

priority:number;

createdAt:Date;


}
