

import {
RuntimeEvent
} from "../events";


export type RiskLevel =
"low"
|
"medium"
|
"high";



export interface RiskSignal {

level:RiskLevel;

reason:string;

eventId:string;

}



export class RiskEngine {



analyze(
event:RuntimeEvent
):RiskSignal | null{


if(
event.type==="agent.failed"
){

return {

level:"high",

reason:
"Agent execution failed",

eventId:
event.id

};

}



if(
event.type==="tool.called"
){

return {

level:"medium",

reason:
"Tool execution detected",

eventId:
event.id

};

}



return null;


}


}
