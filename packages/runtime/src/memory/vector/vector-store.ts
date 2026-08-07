import {
VectorMemory
} from "./vector-memory";


export class VectorMemoryStore {


private memories:
Map<string,VectorMemory>;


constructor(){

this.memories =
new Map();

}



add(
memory:VectorMemory
){

this.memories.set(
memory.id,
memory
);


return memory;

}



list(){

return Array.from(
this.memories.values()
);

}



findByAgent(
agentId:string
){

return this.list()
.filter(
m =>
m.agentId===agentId
);

}



clear(){

this.memories.clear();

}


}
