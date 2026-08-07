import {
LearningPattern
} from "./learning-pattern";


export class PatternStore {


private patterns:
Map<string,LearningPattern>;


constructor(){

this.patterns =
new Map();

}


add(
pattern:LearningPattern
){

this.patterns.set(
pattern.id,
pattern
);

return pattern;

}


find(
agentId:string
){

return Array.from(
this.patterns.values()
)
.filter(
p =>
p.agentId===agentId
);

}


search(
trigger:string
){

return Array.from(
this.patterns.values()
)
.filter(
p =>
p.trigger.includes(trigger)
);

}


list(){

return Array.from(
this.patterns.values()
);

}


}
