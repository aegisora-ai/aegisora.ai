

import { RuntimeContext } from "../context/runtime-context";


export class AgentLifecycle {


constructor(
private context:RuntimeContext
){}



create(
id:string,
name:string
){


this.context.agentRegistry.register({

id,

name,

status:"idle",

createdAt:
new Date(),

updatedAt:
new Date()

});



this.context.eventBus.emit({

id:

crypto.randomUUID(),

type:

"agent.created",

agentId:

id,

timestamp:

new Date(),

payload:{

name

}

});


return id;


}




start(
id:string
){


this.context.agentRegistry.updateStatus(
id,
"running"
);


this.context.eventBus.emit({

id:

crypto.randomUUID(),

type:

"agent.started",

agentId:id,

timestamp:

new Date(),

payload:{}

});


}




complete(
id:string
){


this.context.agentRegistry.updateStatus(
id,
"completed"
);


this.context.eventBus.emit({

id:

crypto.randomUUID(),

type:

"agent.completed",

agentId:id,

timestamp:

new Date(),

payload:{}

});


}




fail(
id:string,
reason:string
){


this.context.agentRegistry.updateStatus(
id,
"failed"
);


this.context.eventBus.emit({

id:

crypto.randomUUID(),

type:

"agent.failed",

agentId:id,

timestamp:

new Date(),

payload:{
reason
}

});


}




stop(
id:string
){


this.context.agentRegistry.updateStatus(
id,
"stopped"
);


}



}


