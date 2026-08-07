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

return {

total:this.events.length,

last:this.events[this.events.length-1],

failures:this.events.filter(
e=>String(e.type).includes("FAIL")
).length

};

}


}
