

import { RuntimeContext } from "../context/runtime-context";


export interface AgentSnapshot {


id:string;


name:string;


status:string;


events:number;


risk:string;


lastActivity:Date;


}



export class AgentSnapshotEngine {



constructor(
private context:RuntimeContext
){}




getSnapshot(
id:string
):AgentSnapshot|null{


const agent=
this.context.agentRegistry.getById(
id
);


if(!agent){

return null;

}



const events=
this.context.eventStore
.getAll()
.filter(
event =>
event.agentId===id
);



const risks=
events
.map(
event =>
this.context.risk.analyze(event)
)
.filter(
r =>
r!==null
);



return {


id:
agent.id,


name:
agent.name,


status:
agent.status,


events:
events.length,


risk:
risks.length>0
?
risks[0]!.level
:
"low",


lastActivity:
agent.updatedAt


};



}





getAll(){


return this.context.agentRegistry
.getAll()
.map(
agent =>
this.getSnapshot(
agent.id
)
)
.filter(
x=>x!==null
);


}



}
