import {
ExecutionResult
} from "./execution-result";


export class AgentExecutor {


private results:
Map<string,ExecutionResult>;



constructor(){

this.results =
new Map();

}



run(
stepId:string,
description:string
){


const result:ExecutionResult={

stepId,

success:true,

output:
`Executed: ${description}`,

createdAt:
new Date()

};



this.results.set(
stepId,
result
);



return result;

}



get(
stepId:string
){

return this.results.get(stepId);

}



list(){

return Array.from(
this.results.values()
);

}


}
