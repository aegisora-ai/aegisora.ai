export interface AgentTeam {


id:string;


name:string;


members:string[];


createdAt:Date;


}


export interface CollaborationTask {


id:string;


teamId:string;


assignedAgent:string;


goal:string;


status:
"idle" |
"running" |
"completed";


result?:unknown;


}
