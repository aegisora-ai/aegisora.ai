export type AutonomyStatus =
"initialized" |
"planning" |
"executing" |
"evaluating" |
"reflecting" |
"completed" |
"failed";


export interface AutonomyState {


id:string;

agentId:string;

goalId:string;

status:AutonomyStatus;


currentStep:string;


progress:number;


createdAt:Date;


updatedAt:Date;


}
