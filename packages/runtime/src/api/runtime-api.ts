

import {
AgentRuntime
} from "../agent/runtime";


export class RuntimeAPI {


constructor(
private runtime:AgentRuntime
){}





createAgent(
id:string,
name:string
){

return this.runtime
.createAgent(
id,
name
);

}


startAgent(
id:string
){

return this.runtime
.startAgent(id);

}


completeAgent(
id:string
){

return this.runtime
.completeAgent(id);

}


failAgent(
id:string,
reason:string
){

return this.runtime
.failAgent(
id,
reason
);

}


stopAgent(
id:string
){

return this.runtime
.stopAgent(id);

}



getSnapshot(
id:string
){

return this.runtime
.getSnapshot(
id
);

}


getSnapshots(){

return this.runtime
.getSnapshots();

}


getAgents(){



return this.runtime
.getAgents();

}


getAgent(
id:string
){

return this.runtime
.getAgent(id);

}


getEvents(){


return this.runtime
.getEventStore()
.getAll();

}



getDecisions(){

return this.runtime
.getDecisionTraces();

}



getMetrics(){

return this.runtime
.getMetrics();

}



getRisks(){

return this.runtime
.getRiskSignals();

}


getHealth(
id:string
){

const metrics=
this.runtime.getMetrics();


return {

status:
metrics.failures > 0
?
"degraded"
:
"healthy",

metrics

};

}




}


