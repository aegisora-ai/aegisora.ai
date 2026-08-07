import {
RuntimeTool
} from "./tool";


export class ToolRegistry {


private tools =
new Map<string, RuntimeTool>();


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



get(
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



has(
name:string
){

return this.tools.has(
name
);

}



list(){

return Array.from(
this.tools.values()
);

}


}
