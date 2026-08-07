import {
PermissionRequest,
PermissionResult
} from "./permission";


export class PermissionEngine {



check(
request:PermissionRequest
):PermissionResult{


if(!request.agentId){

return {


action:"deny",


reason:"Missing agent identity",


confidence:1


};

}



return {


action:"allow",


reason:
`Permission granted for ${request.tool}`,


confidence:0.9


};


}



}
