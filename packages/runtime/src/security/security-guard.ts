

import {
RuntimeEvent
} from "../events";


export type SecurityDecision =
"allow"
|
"block";



export interface SecurityResult {

decision:SecurityDecision;

reason:string;

}



export class SecurityGuard {



check(
event:RuntimeEvent
):SecurityResult{


if(
event.type==="tool.called"
){


return {

decision:"allow",

reason:
"Tool execution allowed"

};


}



if(
event.type==="agent.failed"
){


return {

decision:"block",

reason:
"Agent failure detected"

};


}



return {

decision:"allow",

reason:
"No security violation"

};


}



}


