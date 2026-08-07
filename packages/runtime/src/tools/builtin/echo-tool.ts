import {
RuntimeTool
} from "../tool";


export class EchoTool implements RuntimeTool {


name =
"echo";


description =
"Returns received input";


async execute(
input:unknown
){

return {

echo:input

};

}


}
