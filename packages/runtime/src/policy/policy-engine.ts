

import {
RuntimeEvent
} from "../events";


export interface PolicyRule {

name:string;

tool?:string;

action:
"allow"
|
"block";

}


export interface PolicyDecision {

allowed:boolean;

reason:string;

}


export class RuntimePolicyEngine {


private rules:PolicyRule[]=[

{
name:"block-dangerous-tools",
tool:"shell",
action:"block"
}

];


evaluate(
event:RuntimeEvent
):PolicyDecision{


const tool =
(event.payload as any)?.tool;


for(
const rule of this.rules
){

if(
rule.tool===tool &&
rule.action==="block"
){

return {

allowed:false,

reason:
"Policy blocked tool: " + tool

};

}

}


return {

allowed:true,

reason:
"Policy approved"

};


}


}

