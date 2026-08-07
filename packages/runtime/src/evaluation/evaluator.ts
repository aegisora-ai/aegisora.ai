import {
EvaluationResult
} from "./evaluation-result";


export class Evaluator {


evaluate(

output:unknown

):EvaluationResult{


if(output){

return {

status:"success",

score:0.9,

feedback:
"Execution completed successfully",

timestamp:new Date()

};

}


return {

status:"failed",

score:0,

feedback:
"No output produced",

timestamp:new Date()

};


}


}
