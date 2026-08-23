export type DecisionType =
"plan" |
"execute" |
"retry" |
"stop";


export interface AgentDecision {

type:DecisionType;

reason:string;

confidence:number;

}


export class DecisionEngine {


decide(
goal:string
):AgentDecision{


if(!goal || goal.trim().length===0){

return {

type:"stop",

reason:"No goal provided",

confidence:1

};

}



return {

type:"plan",

reason:
`Create execution plan for goal: ${goal}`,

confidence:0.9

};


}


}
