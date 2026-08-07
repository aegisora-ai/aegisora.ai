import {
RuntimeEvent
} from "../events/event";


export class EventStore {

private events: RuntimeEvent[] = [];


append(
event: RuntimeEvent
){
this.events.push(event);
}


getAll(): RuntimeEvent[] {
return [
...this.events
];
}


getByAgent(
agentId:string
): RuntimeEvent[] {

return this.events.filter(
event=>event.agentId===agentId
);

}


getByType(
type:string
): RuntimeEvent[] {

return this.events.filter(
event=>event.type===type
);

}


clear(){
this.events=[];
}

}
