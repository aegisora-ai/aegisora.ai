export interface VectorMemory {


id:string;


agentId:string;


content:string;


embedding:number[];


metadata?:
Record<string,unknown>;


createdAt:Date;


}
