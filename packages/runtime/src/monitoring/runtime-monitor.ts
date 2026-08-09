import type {
RuntimeEvent
} from "../events/event";


export class RuntimeMonitor {


constructor(
private events: RuntimeEvent[]
){}


record(
event:RuntimeEvent
){

this.events.push(event);

}


check(
event:RuntimeEvent
){

return {

timestamp:event.timestamp,

type:event.type

};

}


getMetrics(){

const failureEvents =
this.events.filter(
e => e.type === "agent.failed"
);

return {

total:
this.events.length,

last:
this.events[this.events.length - 1],

failures:
failureEvents.length

};

}

}
