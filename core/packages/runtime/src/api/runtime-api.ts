import {
AgentRuntime
} from "../agent/runtime";

export class RuntimeAPI {

constructor(
private runtime: AgentRuntime
){}


createAgent(
id:string,
config?:unknown
){

return this.runtime
.createAgent(
id,
config
);

}


startAgent(
id:string,
goal:string = ""
){

return this.runtime
.startAgent(
id,
goal
);

}


runAgent(
id:string,
goal:string = ""
){

return this.runtime
.runAgent(
id,
goal
);

}


completeAgent(
id:string
){

return this.runtime
.completeAgent(id);

}


failAgent(
id:string,
reason?:unknown
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
.getSnapshot(id);

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

getEvidence() {
    return this.runtime.getEvidence();
  }

  getEvidenceByTrace(
    traceId: string,
  ) {
    return this.runtime.getEvidenceByTrace(
      traceId,
    );
  }

  getEvidenceByDecision(
    decisionId: string,
  ) {
    return this.runtime.getEvidenceByDecision(
      decisionId,
    );
  }

  getEvidenceByAgent(
    agentId: string,
  ) {
    return this.runtime.getEvidenceByAgent(
      agentId,
    );
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

return this.runtime
.getHealth(id);

}


}
