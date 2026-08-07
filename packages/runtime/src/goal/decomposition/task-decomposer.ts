import {
GoalTask
} from "./goal-task";


export class TaskDecomposer {



decompose(
goalId:string,
objective:string
):GoalTask[]{


const steps=[

"Analyze objective",

"Create execution plan",

"Select required tools",

"Execute task",

"Evaluate result",

"Improve strategy"

];


return steps.map(
(step,index)=>({

id:
crypto.randomUUID(),

goalId,

title:
step,

description:
`${step} for ${objective}`,

order:
index+1,

completed:false


})

);


}


}
