import {
LearningRecord
} from "./learning-record";


export class LearningEngine {


private records:
Map<string,LearningRecord>;


constructor(){

this.records =
new Map();

}


learn(
record:LearningRecord
){

this.records.set(
record.id,
record
);

return record;

}


findByAgent(
agentId:string
){

return Array.from(
this.records.values()
)
.filter(
record =>
record.agentId===agentId
);

}


getLessons(
agentId:string
){

return this.findByAgent(agentId)
.map(
record =>
record.lesson
);

}


list(){

return Array.from(
this.records.values()
);

}


clear(){

this.records.clear();

}


}
