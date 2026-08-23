export interface LearningRecord {

id:string;

agentId:string;

taskId?:string;

input:unknown;

output:unknown;

success:boolean;

score:number;

lesson:string;

createdAt:Date;

}
