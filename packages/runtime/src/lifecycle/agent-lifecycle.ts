

import { RuntimeContext } from "../context/runtime-context";
import { Agent } from "../agent/core/agent";


export class AgentLifecycle {


constructor(
private context:RuntimeContext
){}



create(
agent: Agent
){


this.context.agentRegistry.register(
agent
);



this.context.eventBus.emit({

id:

crypto.randomUUID(),

type:

"agent.created",

agentId: agent.id,

timestamp:

new Date(),

payload:{ name: agent.name }

});


return agent.id;


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

agentId: id,

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

agentId: id,

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

agentId: id,

timestamp:

new Date(),

payload:{
reason
}

});


}




stop(
id: string
){

this.context.agentRegistry.updateStatus(
id,
"stopped"
);

this.context.eventBus.emit({

id: crypto.randomUUID(),

type: "agent.stopped",

agentId: id,

timestamp: new Date(),

payload: {}

});

}



}
