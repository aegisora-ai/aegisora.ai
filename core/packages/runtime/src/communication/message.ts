export interface AgentMessage {

id:string;

from:string;

to:string;

content:unknown;

createdAt:Date;

}


export type MessageHandler =
(
message:AgentMessage
)=>Promise<void>;
