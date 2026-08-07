export interface AgentProfile {


id:string;


name:string;


role:string;


description:string;


capabilities:string[];


metadata?:
Record<string,unknown>;


createdAt:Date;


}
