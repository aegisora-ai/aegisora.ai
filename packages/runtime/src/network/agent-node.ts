import {
AgentProfile
} from "../identity";


export interface AgentNode {


profile:
AgentProfile;


status:
"online" |
"busy" |
"offline";


connectedAt:
Date;


}


