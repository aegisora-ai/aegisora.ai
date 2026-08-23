export interface ToolDescriptor {

name:string;

description:string;

}


export interface ToolSelectionContext {

goal:string;

availableTools:
ToolDescriptor[];

}


export interface ToolSelectionResult {

tool:ToolDescriptor;

reason:string;

confidence:number;

}
