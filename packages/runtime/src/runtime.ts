

import {
AgentRuntime
} from "./agent/runtime";


import {
RuntimeAPI
} from "./api";


export interface AegisoraRuntime {

runtime:
AgentRuntime;

api:
RuntimeAPI;

}



export function createRuntime()
:AegisoraRuntime{


const runtime=
new AgentRuntime();



return {

runtime,

api:
new RuntimeAPI(
runtime
)

};


}
