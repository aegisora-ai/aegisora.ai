import { AegisoraClient } from '@aegisora/sdk';

async function main(){

 const aegisora = new AegisoraClient();

 const agent = aegisora.agent({
   name:'consumer-test-agent'
 });

 const result = await agent.run(
   'hello governance'
 );

 console.log(JSON.stringify(result,null,2));
}

main();
