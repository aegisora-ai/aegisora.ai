import {
MemoryEntry
} from "./memory-entry";

export class MemoryStore {

private memories:
Map<string,MemoryEntry>;

constructor(){

this.memories=
new Map();

}

add(
memory:MemoryEntry
){

this.memories.set(
memory.id,
memory
);

return memory;

}

remove(
id:string
){

return this.memories.delete(id);

}

clear(){

this.memories.clear();

}

list(){

return Array.from(
this.memories.values()
);

}

findByAgent(
agentId:string
){

return this.list().filter(
m=>m.agentId===agentId
);

}

}
