/**
 * Provider context types
 */

export type RiskLevel =
"LOW" |
"MEDIUM" |
"HIGH" |
"CRITICAL";


export interface ProviderRuntimeContext {

requestId:string;

prompt:string;

userId?:string;

agentId?:string;

action?:string;

metadata?:Record<string,unknown>;

riskScore?:number;

riskLevel?:RiskLevel;

suspicious?:boolean;

signals?:string[];

blocked?:boolean;

provider?:string;

response?:string;

startedAt:Date;

finishedAt?:Date;

}







export type RuntimeContext = ProviderRuntimeContext;
