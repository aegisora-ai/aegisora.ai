
import {
AgentRuntime
} from "../src";

async function main(){

const runtime =
new AgentRuntime();

runtime.create(
"test-agent",
{
role:"planner-agent"
}
);

const result =
await runtime.execute({
agentId:"test-agent",
goal:"Create a simple autonomous task plan"
});

console.log(result);

}

main();
