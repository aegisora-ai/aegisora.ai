import {
  RuntimeTool,
  ToolContext
} from "./tool";

import {
  EnforcementGate
} from "../enforcement";

export class ToolRegistry {

  constructor(executionToken: symbol) {
    this.#executionToken = executionToken;
  }


  #executionToken: symbol;



private enforcement?: EnforcementGate;

private tools =
new Map<string, RuntimeTool>();



setEnforcementGate(
gate:EnforcementGate
){

this.enforcement = gate;

}

register(
tool:RuntimeTool
){

if(this.tools.has(tool.name)){
throw new Error(
`Tool already registered: ${tool.name}`
);
}


this.tools.set(
tool.name,
tool
);


return tool;

}



remove(
name:string
){

return this.tools.delete(
name
);

}



private resolve(
  name:string
){

  const tool =
    this.tools.get(name);

  if(!tool){

    throw new Error(
      `Tool not found: ${name}`
    );

  }

  return tool;

}


get(
  name:string
){

  const tool =
    this.resolve(name);

  return {
    name: tool.name,
    description: tool.description,
  };

}


has(
name:string
){

return this.tools.has(
name
);

}




  async execute(
    name:string,
    input:unknown,
    context:ToolContext,
    authorization?:symbol,
  ):Promise<unknown>{

    if (authorization !== this.#executionToken) {
      throw new Error(
        "[ENFORCEMENT:BLOCK] Direct ToolRegistry execution is not authorized."
      );
    }


    if (!this.enforcement) {
      throw new Error("ToolRegistry execution boundary is not configured.");
    }

    const enforcement =
      await this.enforcement.enforce({
        agentId: context.agentId,
        resourceType: "tool",
        tool: name,
        action: "tool.execute",
        input,
        metadata: context.metadata,
      });

    if (enforcement.decision !== "ALLOW") {
      throw new Error(
        `[ENFORCEMENT:${enforcement.decision}] ${enforcement.reason}`
      );
    }


    const tool =
      this.resolve(name);

    return tool.execute(
      input,
      context
    );

  }

list(){

  return Array.from(
    this.tools.values()
  ).map(
    tool => ({
      name: tool.name,
      description: tool.description,
    })
  );

}


}
