import {
AgentMessage,
MessageHandler
} from "./message";


export class MessageBus {


private handlers:
Map<string,MessageHandler[]>;



constructor(){

this.handlers =
new Map();

}



/**
 * Subscribe agent
 */

subscribe(
agentId:string,
handler:MessageHandler
){

const existing =
this.handlers.get(agentId) ?? [];


existing.push(handler);


this.handlers.set(
agentId,
existing
);

}



/**
 * Send message
 */

async send(
message:AgentMessage
){

const handlers =
this.handlers.get(message.to) ?? [];


for(const handler of handlers){

await handler(message);

}

}



/**
 * Connected agents
 */

agents(){

return Array.from(
this.handlers.keys()
);

}


}
