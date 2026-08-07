import {
AgentNode
} from "./agent-node";


import {
AgentProfile
} from "../identity";


export class AgentNetwork {


private nodes:
Map<string,AgentNode>;



constructor(){

this.nodes =
new Map();

}



connect(
profile:AgentProfile
){


const node:AgentNode={

profile,

status:"online",

connectedAt:
new Date()

};


this.nodes.set(
profile.id,
node
);


return node;

}




disconnect(
agentId:string
){


return this.nodes.delete(
agentId
);


}




get(
agentId:string
){


const node =
this.nodes.get(agentId);



if(!node){

throw new Error(
`Agent not connected: ${agentId}`
);

}


return node;

}




list(){

return Array.from(
this.nodes.values()
);

}




setStatus(

agentId:string,

status:
"online" |
"busy" |
"offline"

){


const node =
this.get(agentId);


node.status =
status;


return node;

}


}
