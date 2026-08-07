import {
Observation,
ObservationContext
} from "./observation";


export class Observer {


observe(

context:ObservationContext

):Observation{


return {

id:crypto.randomUUID(),

source:"runtime",

data:{

agentId:context.agentId,

goal:context.goal,

environment:"unknown"

},

timestamp:new Date()

};


}


}
