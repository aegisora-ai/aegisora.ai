

import {
AgentSnapshot
} from "../snapshot";



export interface AgentHealth {


score:number;


level:
"excellent"
|
"good"
|
"warning"
|
"critical";


warnings:string[];


}



export class AgentHealthEngine {



evaluate(
snapshot:AgentSnapshot
):AgentHealth{


let score=100;


const warnings:string[]=[];



if(
snapshot.status==="failed"
){

score-=50;

warnings.push(
"Agent failed"
);

}



if(
snapshot.risk==="high"
){

score-=30;

warnings.push(
"High risk detected"
);

}



if(
snapshot.events===0
){

score-=10;

warnings.push(
"No activity detected"
);

}



let level:
AgentHealth["level"];


if(score>=90){

level="excellent";

}
else if(score>=70){

level="good";

}
else if(score>=40){

level="warning";

}
else{

level="critical";

}



return {


score,


level,


warnings


};


}



}

