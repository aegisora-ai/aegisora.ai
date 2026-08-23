export interface SupervisionTask {


id:string;


goal:string;


agents:string[];


status:
"idle" |
"running" |
"completed";


result?:unknown;


createdAt:Date;


}
