import {
ToolRegistry
} from "../tool-registry";

import {
ToolSelectionResult
} from "./tool-selection";

export class ToolSelector {

constructor(
private registry:ToolRegistry
){}

select(
goal:string
):ToolSelectionResult{

const tools =
this.registry.list();

if(tools.length===0){

throw new Error(
"No tools available"
);

}

const scored =
tools.map(tool=>{

let score=0;

const text =
(
tool.name +
" " +
tool.description
).toLowerCase();

const target =
goal.toLowerCase();

if(
target.includes(
tool.name.toLowerCase()
)
){

score+=1;

}

for(
const word of target.split(" ")
){

if(
word.length>3 &&
text.includes(word)
){

score+=0.2;

}

}

return {
tool,
score
};

});


scored.sort(
(a,b)=>b.score-a.score
);


const selected =
scored[0];


return {

tool:selected.tool,

reason:
"Selected "+selected.tool.name+
" for goal: "+goal,

confidence:
Math.min(
1,
0.5 + selected.score
)

};

}

}
