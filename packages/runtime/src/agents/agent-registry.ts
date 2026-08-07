

export type AgentStatus =
"idle"
|
"running"
|
"completed"
|
"failed"
|
"stopped";


export interface RegisteredAgent {


id:string;

name:string;

status:AgentStatus;

createdAt:Date;

updatedAt:Date;


}



export class AgentRegistry {


private agents:
RegisteredAgent[]=[];



register(
agent:RegisteredAgent
){


this.agents.push(
agent
);


}



updateStatus(
id:string,
status:AgentStatus
){


const agent=
this.agents.find(
a=>a.id===id
);


if(agent){

agent.status=status;

agent.updatedAt=
new Date();

}


}



getAll(){


return [
...this.agents
];


}



getById(
id:string
){


return this.agents.find(
a=>a.id===id
);


}



remove(
id:string
){


this.agents=
this.agents.filter(
a=>a.id!==id
);


}


}


