export type EvaluationStatus =
"success" |
"partial" |
"failed";


export interface EvaluationResult {


status:EvaluationStatus;


score:number;


feedback:string;


timestamp:Date;


}
