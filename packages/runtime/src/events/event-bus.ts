


import {
RuntimeEvent
} from "./event";

import {
EventStore
} from "../observability";




export class EventBus {

private store:EventStore;

constructor(
store:EventStore
){
this.store=store;
}



private listeners:
Array<(event:RuntimeEvent)=>void>
=[];


emit(
event:RuntimeEvent
){


if(this.store){

this.store.append(
event
);

}


for(
const listener of this.listeners
){

listener(event);

}

}


subscribe(
listener:(event:RuntimeEvent)=>void
){

this.listeners.push(listener);

}


}

