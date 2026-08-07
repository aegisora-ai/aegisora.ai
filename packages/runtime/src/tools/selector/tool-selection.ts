import {
RuntimeTool
} from "../tool";


export interface ToolSelectionContext {

goal:string;

availableTools:
RuntimeTool[];

}


export interface ToolSelectionResult {

tool:RuntimeTool;

reason:string;

confidence:number;

}
