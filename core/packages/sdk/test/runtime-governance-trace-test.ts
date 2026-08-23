import { AegisoraClient } from '@aegisora/sdk';

async function main(){

 const aegisora = new AegisoraClient();

 const agent = aegisora.agent({
   name:'governance-trace-agent'
 });

 const runtime = aegisora.runtimeInstance();

 console.log("AGENT CREATED");

 const result = await agent.run(
   'execute governance validation'
 );

 console.log(JSON.stringify(result,null,2));

 console.log("");
 console.log("DECISION TRACES:");

 console.log(
   JSON.stringify(
     runtime.getDecisionTraces(),
     null,
     2
   )
 );

}

main();
