import {
MemoryStore
} from "./memory-store";

import {
MemoryEntry
} from "./memory-entry";

export class AgentMemory {

constructor(

private store=
new MemoryStore()

){}

remember(
agentId:string,
content:unknown
){

const entry:MemoryEntry={

id:
crypto.randomUUID(),

agentId,

content:
typeof content==="string"
?content
:JSON.stringify(content),

createdAt:
new Date()

};

this.store.add(
entry
);

return entry;

}

set(
id:string,
content:unknown
){

return this.remember(
"default",
{
id,
content
}
);

}

get(
id:string
){

return this.store.list()
.find(
m=>m.id===id
);

}

recall(
agentId:string
){

return this.store.findByAgent(
agentId
);

}

clear(
agentId:string
){

this.recall(agentId)
.forEach(
m=>this.store.remove(m.id)
);

}

list(){

return this.store.list();

}

}
