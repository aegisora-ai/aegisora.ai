export interface ToolContext {

agentId:string;

metadata?:Record<string,unknown>;

}


export interface RuntimeTool {


name:string;


description:string;


execute(
input:unknown,
context:ToolContext
):Promise<unknown>;


}
