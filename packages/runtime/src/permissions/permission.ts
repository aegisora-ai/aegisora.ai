export type PermissionAction =

"allow" |

"deny" |

"review";



export interface PermissionRequest {


agentId:string;


tool:string;


action:string;


metadata?:Record<string,unknown>;

}



export interface PermissionResult {


action:PermissionAction;


reason:string;


confidence:number;

}
