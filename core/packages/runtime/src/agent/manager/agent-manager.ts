import {
Agent,
AgentConfig,
} from "../core/agent";


export class AgentManager {

private agents:
Map<string, Agent>;


constructor(){

this.agents =
new Map();

}


/**
 * Create new autonomous agent
 */
create(
config: AgentConfig
){

const agent =
new Agent(config);


this.agents.set(
config.id,
agent
);


return agent;

}


/**
 * Get agent by id
 */
get(
id:string
){

const agent =
this.agents.get(id);


if(!agent){

throw new Error(
`Agent not found: ${id}`
);

}


return agent;

}


/**
 * Remove agent
 */
remove(
id:string
){

return this.agents.delete(id);

}


/**
 * List all agents
 */
list(){

return Array.from(
this.agents.values()
);

}


/**
 * Count agents
 */
count(){

return this.agents.size;

}

}
