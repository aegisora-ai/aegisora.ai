import {
MemoryContext
} from "./memory-context";


export class ContextManager {


private contexts:
Map<string,MemoryContext>;


constructor(){

this.contexts =
new Map();

}



create(
agentId:string,
sessionId:string
){

const context:MemoryContext={

id:
crypto.randomUUID(),

agentId,

sessionId,

messages:[],

createdAt:
new Date(),

updatedAt:
new Date()

};


this.contexts.set(
context.id,
context
);


return context;

}



addMessage(
id:string,
message:string
){

const context =
this.contexts.get(id);


if(!context){

throw new Error(
"Memory context not found"
);

}


context.messages.push(
message
);


context.updatedAt =
new Date();


return context;

}



get(
id:string
){

const context =
this.contexts.get(id);


if(!context){

throw new Error(
"Memory context not found"
);

}


return context;

}



list(){

return Array.from(
this.contexts.values()
);

}


}
