

export interface DecisionTrace {


id:string;


agentId:string;


action:string;


decision:
"allow"
|
"block";


reason:string;


timestamp:Date;


}


export class DecisionTraceStore {


private traces:DecisionTrace[]=[];


record(
trace:DecisionTrace
){

this.traces.push(trace);

}


getAll(){

return [
...this.traces
];

}


getByAgent(
agentId:string
){

return this.traces.filter(
t=>t.agentId===agentId
);

}


}

