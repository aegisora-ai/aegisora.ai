export interface PlanStep {

id:string;

goalId:string;

description:string;

order:number;

completed:boolean;

}

export interface AgentPlan {

id:string;

goalId:string;

steps:PlanStep[];

createdAt:Date;

}
