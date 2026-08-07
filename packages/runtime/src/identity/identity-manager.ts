import {
AgentProfile
} from "./agent-profile";


export class IdentityManager {


private profiles:
Map<string,AgentProfile>;



constructor(){

this.profiles =
new Map();

}



create(

profile:
Omit<AgentProfile,"createdAt">

){


const agent:AgentProfile={

...profile,

createdAt:
new Date()

};


this.profiles.set(
agent.id,
agent
);


return agent;

}




get(
id:string
){


const agent =
this.profiles.get(id);



if(!agent){

throw new Error(
`Agent profile not found: ${id}`
);

}


return agent;

}




list(){

return Array.from(
this.profiles.values()
);

}



remove(
id:string
){

return this.profiles.delete(id);

}


}
