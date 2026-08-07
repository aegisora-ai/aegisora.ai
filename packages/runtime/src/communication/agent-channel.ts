import {
MessageBus
} from "./message-bus";


export class AgentChannel {


constructor(
private bus:MessageBus,
private agentId:string
){}



/**
 * Receive messages
 */

onMessage(
handler:any
){

this.bus.subscribe(
this.agentId,
handler
);

}



/**
 * Send message
 */

send(
target:string,
content:unknown
){

return this.bus.send({

id:
crypto.randomUUID(),

from:
this.agentId,

to:
target,

content,

createdAt:
new Date()

});

}


}
